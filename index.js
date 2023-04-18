const editProfileBtn = document.querySelector('.profile__edit-info');
const popupCloseBtns = document.querySelectorAll('.popup__close');
const popupForms = document.querySelectorAll('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const addPostBtn = document.querySelector('.profile__add-post');
const postGrid = document.querySelector('.posts__grid');
const bigImage = document.querySelector('.popup__big-image');
const figcaption = document.querySelector('.popup__figcaption');
const captionInput = document.querySelector('#caption');
const linkInput = document.querySelector('#link');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach(card => postGrid.append(createPost(card.link, card.name)));

function openPopup(element) {
    element.classList.add('popup_opened');
}

function closePopup(element) {
    element.classList.remove('popup_opened');
}

function createPost(link, name) {
    const post = document.querySelector('#post').content;
    const postElement = post.querySelector('.post').cloneNode(true);
    const postImg = postElement.querySelector('.post__img');

    postImg.src = link;
    postImg.alt = name;
    postElement.querySelector('.post__title').textContent = name;
    postImg.addEventListener('click', (evt) => {
        openPopup(popupImage);
        openImage(evt);
    })
    postElement.querySelector('.post__like').addEventListener('click', (evt) => { evt.target.classList.toggle('post__like_liked') });
    postElement.querySelector('.post__trash').addEventListener('click', (evt) => { evt.target.closest('.post').remove() });
    return postElement;
}

function openImage(evt) {
    const parentPostTitle = evt.target.parentNode.querySelector('.post__title');
    bigImage.src = evt.target.src;
    bigImage.alt = parentPostTitle.textContent;
    figcaption.textContent = parentPostTitle.textContent;
}

function editProfile() {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}

function submitPopup(evt) {
    evt.preventDefault();
    if (evt.target.closest('.popup_type_edit')) {
        profileName.textContent = nameInput.value;
        profileDescription.textContent = descriptionInput.value;
    } else if (evt.target.closest('.popup_type_add')) {
        postGrid.prepend(createPost(linkInput.value, captionInput.value));
    }
    closePopup(evt.target.closest('.popup'));
    evt.target.reset();
}

editProfileBtn.addEventListener('click', editProfile);

addPostBtn.addEventListener('click', () => { openPopup(popupAdd) });

popupCloseBtns.forEach(element => {
    element.addEventListener('click', () => {
        closePopup(element.closest('.popup'));
    })
});

popupForms.forEach(form => { form.addEventListener('submit', submitPopup) });
