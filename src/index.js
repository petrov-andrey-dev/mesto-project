import "./pages/index.css";
import { createPost } from "./components/card.js";
import { enableValidation } from "./components/validate.js";
import { initialCards } from "./components/initialCards.js";
import { openPopup, closePopup, submitPopup, editProfile, popup, popupForms, popupAdd, popupImage, popupEditAvatar } from './components/modal.js';
import { openImage, postGrid, addPostBtn } from "./components/card.js";

const editAvatarBtn = document.querySelector('.profile__edit-avatar');
const editProfileBtn = document.querySelector('.profile__edit-info');

initialCards.forEach(card => postGrid.append(createPost(card.link, card.name)));

editProfileBtn.addEventListener('click', editProfile);

addPostBtn.addEventListener('click', () => { openPopup(popupAdd) });

editAvatarBtn.addEventListener('click', () => { openPopup(popupEditAvatar) });

popup.forEach(item => {
    item.addEventListener('click', evt => {
        if (evt.target.classList.contains('popup')) {
            closePopup(evt.target);
        } else if (evt.target.classList.contains('popup__close')) {
            closePopup(evt.target.closest('.popup'));
        }
    });
});

popupForms.forEach(form => { form.addEventListener('submit', submitPopup) });

postGrid.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('post__like')) {
        evt.target.classList.toggle('post__like_liked');
    } else if (evt.target.classList.contains('post__trash')) {
        evt.target.closest('.post').remove();
    } else if (evt.target.classList.contains('post__img')) {
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