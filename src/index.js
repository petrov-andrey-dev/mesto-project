import "./pages/index.css";
import { Post, postGrid, captionInput, linkInput, btnAddPost } from "./components/Card.js";
import { FormValidator } from "./components/validate.js";
//import {openPopup, editProfile, handlePopupClose, handleSubmit } from './components/modal.js';
import Api from "./components/api.js";
import { PopupWithForm } from "./components/popupWithForm";
import { PopupWithImage } from "./components/PopupWithImage";
import { UserInfo } from "./components/UserInfo";
import PopupConfirm from "./components/PopupConfirm";
import Section from "./components/Section";
import {handleSubmit} from "./components/utils"


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
// переменные
let userId; //текущий userID
let currentPost; //текущий пост

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
    headers: {
        authorization: 'e03c6a58-2a56-454c-8255-6314725b68cd',
        'Content-Type': 'application/json'
    }
};

const api = new Api(config);
//-------------->ООП UserInfo <---------------------
//создаем объект класса для получения информации из полей 
// const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');
// console.log (userInfo)

const postSection = new Section(renderPost, postGrid);

const profilePopup = new PopupWithForm('.popup_type_edit', submitPopupEdit);
const cardPopup = new PopupWithForm('.popup_type_add', sibmitPopupAdd);
const avatarPopup = new PopupWithForm('.popup_type_edit-avatar', submitPopupAvatar);
const confirmPopup = new PopupConfirm('.popup_type_delete-post', submitDeletePost)
confirmPopup.setEventListeners();
//console.log(profilePopup);




// начальная загрузка профиля и постов
Promise.all([api.getProfile(), api.getPosts()])
    .then(([userData, posts]) => {
        userId = userData._id
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        avatar.src = userData.avatar;
        postSection.renderItems(posts);
        // posts.forEach(post => {
        //     const postObj = new Post(post, '#post');
        //     postGrid.append(postObj.generateCard());
        // })
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

function submitPopupAvatar(evt) {
    function makePatchAvatar() {
        return api.patchAvatar(inputLinkAvatar.value).then(data => avatar.src = data.avatar);
    }
    handleSubmit(makePatchAvatar, evt);
};

//==============Добавление поста==============
//листенер кнопки добавления поста
btnAddPost.addEventListener('click', () => { openPopup(popupAdd) });

//листенер сабмита добаления поста
popupAdd.addEventListener('submit', sibmitPopupAdd);

//обработчик сабмита добавления поста
function sibmitPopupAdd(evt) {
    function makeUploadPost() {
        return api.uploadPost(linkInput.value, captionInput.value)
            .then(data => {
                const postObj = new Post(data, '#post');
                postGrid.prepend(postObj.generateCard());
            })
    };
    handleSubmit(makeUploadPost, evt);
};

//==============Изменение профиля==============


//листенер кнопки изменение профиля
//btnEditProfile.addEventListener('click', editProfile);

//листенер сабмита изменения профиля 
//popupEdit.addEventListener('submit', submitPopupEdit);

// обработчик сабмита изменения профиля
function submitPopupEdit(evt) {
    function makePatchProfile() {
        return api.patchProfile(nameInput.value, descriptionInput.value)
            .then(data => {
                renderPost({ data, position: 'prepend'})
                // profileName.textContent = data.name;
                // profileDescription.textContent = data.about;
            })
    }
    handleSubmit(makePatchProfile, evt);
};

//==============Удаление поста==============
//листенер сабмита удаления поста
// popupDeletePost.addEventListener('submit', (evt) => submitDeletePost(evt));

//обработчик клика корзины
function handleTrash(post) {
    confirmPopup.open();
    confirmPopup.getPost(post);
}
// function handleTrash(element, button) {
//     openPopup(popupDeletePost);
//     setCurrentPost(element);
// }

//обработчик сабмита удаления поста
function submitDeletePost(post, evt) {
    function makeDeletePost() {
        return api.deletePost(post)
            .then(() => confirmPopup.post.deletePost())
    }
    handleSubmit(makeDeletePost, evt, 'Удаление...');
};
//=========================================================


function renderPost({ data, position = 'append'}) {
    const newPost = new Post({ data, handleLike, handleImageOpen, handleTrash }, '#post').generateCard();
    postSection.addItem(newPost, position);
}

//добавление листенеров закрытия попапа по оверлею
//handlePopupClose(popups);

//==============Установка/снятие лайка==============
// обработчик установки/снятия лайка
function handleLike(element, button) {
    if (button.classList.contains('post__like')) {
        // setCurrentPost(element);
        if (!button.classList.contains('post__like_liked')) {
            api.putLike(element.dataset.id)
                .then(data => {
                    toggleLike(button);
                    renderLikeCounter(element, data.likes);
                })
                .catch(err => console.log(err))
        } else {
            api.deleteLike(element.dataset.id)
                .then(data => {
                    toggleLike(button);
                    renderLikeCounter(element, data.likes);
                })
                .catch(err => console.log(err))
        }
    }
};

function renderLikeCounter(postElement, likes) {
    postElement.querySelector(".post__like-counter").textContent = likes.length;
}

function toggleLike(postLike) {
    postLike.classList.toggle("post__like_liked");
}
//============================================================

// обработчик открытия картинки
function handleImageOpen(evt) {
    openPopup(popupImage);
    openImage(evt);
};

// включение валидации форм
const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text-input',
    submitButtonSelector: '.popup__submit',
    inputErrorClass: 'popup__text-input_type_error',
    errorClass: 'popup__input-error_active'
};

//создаем объекты классов для валидации форм
const validatorEditProfile = new FormValidator(validationSettings, popupEdit);
const validatorAddCard = new FormValidator(validationSettings, popupAdd);
const validatorEditAvatar = new FormValidator(validationSettings, popupEditAvatar);

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
validatorEditAvatar.enableValidation();

api.uploadPost('https://images.unsplash.com/photo-1685059352125-077b37ca6743?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80', 'uchuhc');

export {
    userId,
    api,
    inputLinkAvatar,
    popupEdit,
    nameInput,
    descriptionInput,
    profileName,
    profileDescription,
    popups,
    popupImage,
    popupDeletePost,
    submitDeletePost,
    setCurrentPost,
    handleTrash,
    confirmPopup
}

