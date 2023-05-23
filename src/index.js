import "./pages/index.css";
import { openImage, createPost, renderLikeCounter, toggleLike, postGrid, captionInput, linkInput, btnAddPost } from "./components/card.js";
import { enableValidation } from "./components/validate.js";
import { openPopup, closePopup, renderSubmitBtn, editProfile, closeByOverlay } from './components/modal.js';
import { patchAvatar, uploadPost, putLike, deleteLike, patchProfile, deletePost, getPosts, getProfile } from "./components/api.js";
import { submitPopup } from "./components/utils.js";

const btnEditAvatar = document.querySelector('.profile__edit-avatar');
const btnEditProfile = document.querySelector('.profile__edit-info');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const inputLinkAvatar = document.querySelector('#link-avatar');
const avatar = document.querySelector('.profile__avatar');
// попапы
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupDeletePost = document.querySelector('.popup_type_delete-post');
// кнопки сабмитов попапов
const submitBtnEdit = popupEdit.querySelector('.popup__submit');
const submitBtnAdd = popupAdd.querySelector('.popup__submit');
const submitBtnEditAvatar = popupEditAvatar.querySelector('.popup__submit');
const submitBtnDeletePost = popupDeletePost.querySelector('.popup__submit');

let userId;
let currentPost; //текущий пост

// начальная загрузка профиля и постов
Promise.all([getProfile(), getPosts()])
    .then(([userData, posts]) => {
        userId = userData._id
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        avatar.src = userData.avatar;
        posts.forEach(post => postGrid.append(createPost(post.link, post.name, post.likes, post.owner._id, post._id)));
    })
    .catch(err => console.log(err))

// Установка текущего поста
function setCurrentPost(evt) {
    return currentPost = evt.target.closest('.post');
};


//==============Изменение аватара==============
//листенер кнопки изменения аватара
btnEditAvatar.addEventListener('click', () => { openPopup(popupEditAvatar) });

//листенер кнопки сабмита сохранения аватара
popupEditAvatar.addEventListener('submit', submitPopupAvatar);

// Обработчик сабмита сохранения аватара
function submitPopupAvatar(evt) {
    evt.preventDefault();
    renderSubmitBtn(true, submitBtnEditAvatar);
    patchAvatar(inputLinkAvatar.value)
        .then(data => {
            avatar.src = data.avatar;
            closePopup(evt.target.closest('.popup'));
        })
        .then(() => submitPopup(evt))
        .catch(err => console.log(err))
        .finally(() => renderSubmitBtn(false, submitBtnEditAvatar))
};

//==============Добавление поста==============
//листенер кнопки добавления поста
btnAddPost.addEventListener('click', () => { openPopup(popupAdd) });

//листенер сабмита добаления поста
popupAdd.addEventListener('submit', sibmitPopupAdd);

//обработчик сабмита добавления поста
function sibmitPopupAdd(evt) {
    evt.preventDefault();
    renderSubmitBtn(true, submitBtnAdd);
    uploadPost(linkInput.value, captionInput.value)
        .then(data => {
            postGrid.prepend(createPost(data.link, data.name, data.likes, data.owner._id, data._id));
        })
        .then(() => submitPopup(evt))
        .catch(err => console.log(err))
        .finally(() => renderSubmitBtn(false, submitBtnAdd, 'Создать'))
};

//==============Изменение профиля==============
//листенер кнопки изменение профиля
btnEditProfile.addEventListener('click', editProfile);

//листенер сабмита изменения профиля 
popupEdit.addEventListener('submit', submitPopupEdit);

// обработчик сабмита изменения профиля
function submitPopupEdit(evt) {
    evt.preventDefault();
    renderSubmitBtn(true, submitBtnEdit);
    patchProfile(nameInput.value, descriptionInput.value)
        .then(data => {
            profileName.textContent = data.name;
            profileDescription.textContent = data.about;
        })
        .then(() => submitPopup(evt))
        .catch(err => console.log(err))
        .finally(() => renderSubmitBtn(false, submitBtnEdit))
};

//==============Удаление поста==============
//листенер сабмита удаления поста
popupDeletePost.addEventListener('submit', (evt) => submitDeletePost(evt));

//обработчик клика корзины
function handlerTrash(evt) {
    openPopup(popupDeletePost);
    setCurrentPost(evt);
}

//обработчик сабмита удаления поста
function submitDeletePost(evt) {
    evt.preventDefault();
    renderSubmitBtn(true, submitBtnDeletePost, 'Да', 'Удаление...');
    deletePost(currentPost)
        .then(() => currentPost.remove())
        .then(() => submitPopup(evt))
        .catch(err => console.log(err))
        .finally(() => renderSubmitBtn(false, submitBtnDeletePost, 'Да', 'Удаление...'))
};

//==============Установка/снятие лайка==============
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

//==============Открытие картинки==============
// обработчик открытия картинки
function openImageHandler(evt) {
    openPopup(popupImage);
    openImage(evt);
}

//добавление листенеров закрытия попапа по оверлею
closeByOverlay(popups);

// включение валидации форм
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__text-input',
    submitButtonSelector: '.popup__submit',
    inputErrorClass: 'popup__text-input_type_error',
    errorClass: 'popup__input-error_active'
});

export {
    userId,
    inputLinkAvatar,
    popupEdit,
    nameInput,
    descriptionInput,
    profileName,
    profileDescription,
    popups,
    submitDeletePost,
    handlerLike,
    openImageHandler,
    handlerTrash
}