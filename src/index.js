import "./pages/index.css";
import {  openImage, createPost, postGrid, captionInput, linkInput, btnAddPost  } from "./components/card.js";
import { enableValidation } from "./components/validate.js";
import { initialCards } from "./components/initialCards.js";
import { openPopup, closePopup } from './components/modal.js';

const btnEditAvatar = document.querySelector('.profile__edit-avatar');
const btnEditProfile = document.querySelector('.profile__edit-info');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const inputLinkAvatar = document.querySelector('#link-avatar');
const avatar = document.querySelector('.profile__avatar');
const popupEdit = document.querySelector('.popup_type_edit');
const popups = document.querySelectorAll('.popup')
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');

function editProfile() {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
};

function submitPopup(evt) {
    const button = evt.target.querySelector('.popup__submit')
    evt.preventDefault();
    closePopup(evt.target.closest('.popup'));
    evt.target.reset();
    button.disabled = true;
};

function submitPopupAvatar(evt) {
    avatar.src = inputLinkAvatar.value;
    submitPopup(evt);
};

function sibmitPopupAdd(evt) {
    postGrid.prepend(createPost(linkInput.value, captionInput.value));
    submitPopup(evt); 
};

function submitPopupEdit(evt) {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    submitPopup(evt);
};

initialCards.forEach(card => postGrid.append(createPost(card.link, card.name)));

btnEditProfile.addEventListener('click', editProfile);
popupEdit.addEventListener('submit', submitPopupEdit);

btnAddPost.addEventListener('click', () => { openPopup(popupAdd) });
popupAdd.addEventListener('submit', sibmitPopupAdd);

btnEditAvatar.addEventListener('click', () => { openPopup(popupEditAvatar) });
popupEditAvatar.addEventListener('submit', submitPopupAvatar);

popups.forEach(item => {
    item.addEventListener('mousedown', evt => {
        if (evt.target.classList.contains('popup')) {
            closePopup(evt.target);
        } else if (evt.target.classList.contains('popup__close')) {
            closePopup(evt.target.closest('.popup'));
        }
    });
});

postGrid.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('post__like')) {
        evt.target.classList.toggle('post__like_liked');
    } else if (evt.target.classList.contains('post__trash')) {
        evt.target.closest('.post').remove();
    } else if (evt.target.classList.contains('post__open-img')) {
        openPopup(popupImage);
        openImage(evt);
    }
});

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__text-input',
    submitButtonSelector: '.popup__submit',
    inputErrorClass: 'popup__text-input_type_error',
    errorClass: 'popup__input-error_active'
  });