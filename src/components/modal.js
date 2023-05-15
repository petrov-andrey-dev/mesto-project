import { createPost, postGrid, captionInput, linkInput } from "./card.js";
import { closeByEsc } from "./utils.js";

const popup = document.querySelectorAll('.popup')
const popupForms = document.querySelectorAll('.popup__form');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const inputLinkAvatar = document.querySelector('#link-avatar');
const avatar = document.querySelector('.profile__avatar');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const popupEdit = document.querySelector('.popup_type_edit');

function editProfile() {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
};

function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
};

function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
};

function submitPopup(evt) {
    evt.preventDefault();
    if (evt.target.closest('.popup_type_edit')) {
        profileName.textContent = nameInput.value;
        profileDescription.textContent = descriptionInput.value;
    } else if (evt.target.closest('.popup_type_add')) {
        postGrid.prepend(createPost(linkInput.value, captionInput.value));
    } else if (evt.target.closest('.popup_type_edit-avatar')) {
        avatar.src = inputLinkAvatar.value;
    }
    closePopup(evt.target.closest('.popup'));
    evt.target.reset();
};

export { openPopup, closePopup, submitPopup, editProfile, popup, popupForms, popupAdd, popupImage, popupEditAvatar};