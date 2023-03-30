let editProfileBtn = document.querySelector('.profile__edit-info');
let popupCloseBtn = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let nameInput = document.querySelector('#name');
let descriptionInput = document.querySelector('#description');

function popupToggle() {
    popup.classList.toggle('popup_opened');
}

function editProfile() {
    popupToggle();
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}

function popupSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    popupToggle();
}

editProfileBtn.addEventListener('click', editProfile);
popupCloseBtn.addEventListener('click', popupToggle);
popupForm.addEventListener('submit', popupSubmit);