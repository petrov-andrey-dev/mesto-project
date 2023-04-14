const editProfileBtn = document.querySelector('.profile__edit-info');
const popupCloseBtn = document.querySelectorAll('.popup__close');
const popupForm = document.querySelectorAll('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const addPostBtn = document.querySelector('.profile__add-post');

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

initialCards.forEach(card => {addPost(card.link, card.name);})

function popupOpen(element) {
    element.classList.add('popup_opened');
}

function popupClose(element) {
    element.classList.remove('popup_opened');
}

function addPost(link, name) {
    const postGrid = document.querySelector('.posts__grid');
    const post = document.querySelector('#post').content;

    if (link && name) {
        const postElement = post.querySelector('.post').cloneNode(true);
        postElement.querySelector('.post__img').src = link;
        postElement.querySelector('.post__title').textContent = name;
        postElement.querySelector('.post__img').addEventListener('click', (evt) => {
            popupOpen(popupImage);
            openImage(evt);
        })
        postElement.querySelector('.post__like').addEventListener('click', (evt) => { evt.target.classList.toggle('post__like_liked') });
        postElement.querySelector('.post__trash').addEventListener('click', (evt) => { evt.target.closest('.post').remove() });
        postGrid.prepend(postElement);
    } else {
        console.log('Поля "Название" и "Ссылка" не должны быть пустыми');
    }
}

function openImage(evt) {
    const bigImage = document.querySelector('.popup__big-image');
    const figcaption = document.querySelector('.popup__figcaption');

    bigImage.src = evt.target.src;
    figcaption.textContent = evt.target.parentNode.querySelector('.post__title').textContent;
}

function editProfile() {
    popupOpen(popupEdit);
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}

function popupSubmit(evt) {
    evt.preventDefault();
    if (evt.target.closest('.popup_type_edit')) {
        profileName.textContent = nameInput.value;
        profileDescription.textContent = descriptionInput.value;
    } else if (evt.target.closest('.popup_type_add')) {
        const captionInput = document.querySelector('#caption');
        const linkInput = document.querySelector('#link');
        addPost(linkInput.value, captionInput.value);
    }
    popupClose(evt.target.closest('.popup'));
}

editProfileBtn.addEventListener('click', editProfile);

addPostBtn.addEventListener('click', () => {popupOpen(popupAdd)});

popupCloseBtn.forEach(element => {
    element.addEventListener('click', () => {
        popupClose(element.closest('.popup'));
    })
});

popupForm.forEach(form => {form.addEventListener('submit', popupSubmit)});
