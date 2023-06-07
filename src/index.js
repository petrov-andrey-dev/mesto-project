import "./pages/index.css";
// import { Post, postGrid, captionInput, linkInput, btnAddPost } from "./components/Card.js";
import Post from "./components/Card.js";
import { FormValidator } from "./components/validate.js";
import Api from "./components/api.js";
import { PopupWithForm } from "./components/PopupWithForm";
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
const postGrid = document.querySelector(".posts__grid");
const btnAddPost = document.querySelector(".profile__add-post");
const captionInput = document.querySelector("#caption");
const linkInput = document.querySelector("#link");
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
const addPostPopup = new PopupWithForm('.popup_type_add', sibmitPopupAdd);
const avatarPopup = new PopupWithForm('.popup_type_edit-avatar', submitPopupAvatar);
const imagePopup = new PopupWithImage('.popup_type_image');

const confirmPopup = new PopupConfirm('.popup_type_delete-post', submitDeletePost)
confirmPopup.setEventListeners();
addPostPopup.setEventListeners();
avatarPopup.setEventListeners();
imagePopup.setEventListeners();
// начальная загрузка профиля и постов
Promise.all([api.getProfile(), api.getPosts()])
    .then(([userData, posts]) => {
        userId = userData._id
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        avatar.src = userData.avatar;
        postSection.renderItems(posts);
    })
    .catch(err => console.log(err))

// Установка текущего поста
function setCurrentPost(evt) {
    return currentPost = evt.target.closest('.post');
};

//==============Изменение аватара==============
//листенер кнопки изменения аватара
btnEditAvatar.addEventListener('click', () => { avatarPopup.open() });


function submitPopupAvatar(evt) {
    function makePatchAvatar() {
        return api.patchAvatar(inputLinkAvatar.value)
        .then(data => avatar.src = data.avatar);
    }
    handleSubmit(makePatchAvatar, evt, avatarPopup);
};

//==============Добавление поста==============
//листенер кнопки добавления поста
btnAddPost.addEventListener('click', () => { addPostPopup.open()});

//обработчик сабмита добавления поста
function sibmitPopupAdd(evt,{link,caption}) {
    function makeUploadPost() {
        return api.uploadPost( link, caption)
            .then(data => {
                const postObj = new Post({ data, handleLike, handleImageOpen, handleTrash }, '#post');
                postSection.addItem(postObj.generateCard(),'prepend');
            })
    };
    handleSubmit(makeUploadPost, evt,addPostPopup);
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
//обработчик клика корзины
function handleTrash(post) {
    confirmPopup.open();
    confirmPopup.getPost(post);
}

//обработчик сабмита удаления поста
function submitDeletePost(post, evt) {
    function makeDeletePost() {
        return api.deletePost(post)
            .then(() => confirmPopup.post.deletePost())
    }
    handleSubmit(makeDeletePost, evt, confirmPopup, 'Удаление...');
};
//=========================================================


function renderPost({ data, position = 'append'}) {
    const newPost = new Post({ data, handleLike, handleImageOpen, handleTrash }, '#post').generateCard();
    postSection.addItem(newPost, position);
}


//==============Установка/снятие лайка==============
// обработчик установки/снятия лайка
function handleLike(post) {
        if (!post.checkCurrentUserLike()) {
            api.putLike(post)
                .then(data => {
                    post.likes = data.likes;
                    post.toggleLike();
                    post.renderLikeCounter();
                })
                .catch(err => console.log(err))
        } else {
            api.deleteLike(post)
                .then(data => {
                    post.likes = data.likes;
                    post.toggleLike();
                    post.renderLikeCounter();
                })
                .catch(err => console.log(err))
    }
};
//============================================================

// обработчик открытия картинки
function handleImageOpen(post) {
    imagePopup.open(post);
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

