const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
    headers: {
        authorization: 'e03c6a58-2a56-454c-8255-6314725b68cd',
        'Content-Type': 'application/json'
    }
};

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text-input',
    submitButtonSelector: '.popup__submit',
    inputErrorClass: 'popup__text-input_type_error',
    errorClass: 'popup__input-error_active'
};

const popupSelectors = {
    popupTypeEdit: '.popup_type_edit',
    popupTypeAdd: '.popup_type_add',
    popupTypeEditAvatar: '.popup_type_edit-avatar',
    popupTypeImage: '.popup_type_image',
    popupTypeDeleteCard: '.popup_type_delete-card'
};

const btnEditAvatar = document.querySelector('.profile__edit-avatar');
const btnEditProfile = document.querySelector('.profile__edit-info');
const btnAddCard = document.querySelector(".profile__add-card");
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const inputLinkAvatar = document.querySelector('#avatar');
const avatar = document.querySelector('.profile__avatar');
const cardGrid = document.querySelector(".cards__grid");
const bigImage = document.querySelector(".popup__big-image");
const figcaption = document.querySelector(".popup__figcaption");

export {
    config,
    validationSettings,
    popupSelectors,
    btnEditAvatar,
    btnEditProfile,
    btnAddCard,
    profileName,
    profileDescription,
    nameInput,
    descriptionInput,
    inputLinkAvatar,
    avatar,
    cardGrid,
    bigImage,
    figcaption
}