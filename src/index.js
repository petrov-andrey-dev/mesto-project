import "./pages/index.css";
import {  openImage, createPost, renderLikeCounter, toggleLike,  postGrid, captionInput, linkInput, btnAddPost  } from "./components/card.js";
import { enableValidation } from "./components/validate.js";
import { openPopup, closePopup, renderSubmitBtn } from './components/modal.js';
import { patchAvatar, uploadPost, putLike, deleteLike, patchProfile, deletePost, getPosts, getProfile } from "./components/api.js";

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
// const popupDeletePost = document.querySelector('.popup_type_delete-post');
const currentUserId = 'fbff03813343a78265557f95';
let currentPost; //текущий пост

// загрузка профиля
getProfile()
    .then(data => {
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
        avatar.src = data.avatar;
    })
    .catch(err => console.log(err))

// загрузка постов
getPosts()
    .then((data) => {
        data.forEach(post => postGrid.append(createPost(post.link, post.name, post.likes, post.owner._id, post._id)));
    })
    .catch(err => console.log(err))

// Установка текущего поста
function setCurrentPost(evt) {
    return currentPost = evt.target.closest('.post');
};

function editProfile(evt) {
    openPopup(popupEdit, evt);
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
};

// сброс формы после сабмита
function submitPopup(evt) {
    const button = evt.target.querySelector('.popup__submit');
    closePopup(evt.target.closest('.popup'));
    evt.target.reset();
    button.disabled = true;
};

// Обработчик сабмита сохранения аватара
function submitPopupAvatar(evt) {
    evt.preventDefault();
    renderSubmitBtn(true);
    patchAvatar(inputLinkAvatar.value)
        .then(data => {
            avatar.src = data.avatar;
            closePopup(evt.target.closest('.popup'));
        })
        .catch(err => console.log(err))
        .finally(() => renderSubmitBtn(false))
    submitPopup(evt);
};

// Обработчик сабмита добавления поста
function sibmitPopupAdd(evt) {
    evt.preventDefault();
    renderSubmitBtn(true);
    uploadPost(linkInput.value, captionInput.value)
        .then(data => {
            postGrid.prepend(createPost(data.link, data.name, data.likes, data.owner._id, data._id));
        })
        .catch(err => console.log(err))
        .finally(() => renderSubmitBtn(false))
    submitPopup(evt);
};

// обработчик сабмита изменения профиля
function submitPopupEdit(evt) {
    evt.preventDefault();
    renderSubmitBtn(true);
    patchProfile(nameInput.value, descriptionInput.value)
        .then(data => {
            profileName.textContent = data.name;
            profileDescription.textContent = data.about;
        })
        .catch(err => console.log(err))
        .finally(() => renderSubmitBtn(false))
    submitPopup(evt);
};

// обработчик удаления поста (без подтверждения)
function submitDeletePost(evt) {
    setCurrentPost(evt)
    deletePost(currentPost);
    currentPost.remove();
};
// обработчик удаления поста (с подтверждением)
// function submitDeletePost(evt) {
//     evt.preventDefault();
//     evt.target.querySelector('.popup__submit').textContent = 'Да';
//     deletePost(currentPost);
//     currentPost.remove();
//     submitPopup(evt);
// };

// листенер корзины
postGrid.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('post__trash')) {
        submitDeletePost(evt)
    }
});

// обработчик установки/снятия лайка
function handlerLike(evt) {
    if (evt.target.classList.contains('post__like')) {
        setCurrentPost(evt);
        if (!evt.target.classList.contains('post__like_liked')) {
            putLike(currentPost.dataset.id)
            .then(data => {
                toggleLike(evt.target);
                renderLikeCounter(currentPost, data.likes);
            })
            .catch(err => console.log(err))
        } else {
            deleteLike(currentPost.dataset.id)
            .then(data => {
                toggleLike(evt.target);
                renderLikeCounter(currentPost, data.likes);
            })
            .catch(err => console.log(err))
        }
    }
    
}
// листенер лайка
postGrid.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('post__like')) {
        handlerLike(evt);
    }
});

btnEditProfile.addEventListener('click', editProfile);
popupEdit.addEventListener('submit', submitPopupEdit);

btnAddPost.addEventListener('click', () => { openPopup(popupAdd) });
popupAdd.addEventListener('submit', sibmitPopupAdd);

btnEditAvatar.addEventListener('click', () => { openPopup(popupEditAvatar) });
popupEditAvatar.addEventListener('submit', submitPopupAvatar);

// popupDeletePost.addEventListener('submit', submitDeletePost);

popups.forEach(item => {
    item.addEventListener('mousedown', evt => {
        if (evt.target.classList.contains('popup')) {
            closePopup(evt.target);
        } else if (evt.target.classList.contains('popup__close')) {
            closePopup(evt.target.closest('.popup'));
        }
    });
});

// обработчик открытия картинки
function openImageHandler(evt) {
    openPopup(popupImage);
    openImage(evt);
}

// листенер открытия картинки
postGrid.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('post__open-img')) {
        openImageHandler(evt);
    }
});

// включение валидации форм
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__text-input',
    submitButtonSelector: '.popup__submit',
    inputErrorClass: 'popup__text-input_type_error',
    errorClass: 'popup__input-error_active'
  });
  
export { currentUserId, inputLinkAvatar }