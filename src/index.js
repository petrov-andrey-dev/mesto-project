import "./pages/index.css";
import {
    config,
    validationSettings,
    popupSelectors,
    btnEditAvatar,
    btnEditProfile,
    btnAddPost,
    profileName,
    profileDescription,
    nameInput,
    descriptionInput,
    inputLinkAvatar,
    avatar,
    postGrid
} from './utils/constants'
import Post from "./components/Post.js";
import FormValidator from "./components/FormValidator.js";
import Api from "./components/Api.js";
import PopupWithForm from "./components/PopupWithForm";
import PopupWithImage from "./components/PopupWithImage";
import UserInfo from "./components/UserInfo";
import PopupConfirm from "./components/PopupConfirm";
import Section from "./components/Section";
import { handleSubmit } from "./utils/utils"

// переменные
let userId; //текущий userID

//Инициализация класса Api
const api = new Api(config);

//-------------->ООП UserInfo <---------------------
//создаем объект класса для получения информации из полей 
 const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');
// console.log (userInfo)

//Инициализация класса Section
const postSection = new Section(renderPost, postGrid);



//Создание объектов Popup
const profilePopup = new PopupWithForm(popupSelectors.popupTypeEdit, submitPopupEdit);
const addPostPopup = new PopupWithForm(popupSelectors.popupTypeAdd, sibmitPopupAdd);
const avatarPopup = new PopupWithForm(popupSelectors.popupTypeEditAvatar, submitPopupAvatar);
const imagePopup = new PopupWithImage(popupSelectors.popupTypeImage);
const confirmPopup = new PopupConfirm(popupSelectors.popupTypeDeletePost, submitDeletePost)

//Добавление листенеров попапам
confirmPopup.setEventListeners();
addPostPopup.setEventListeners();
avatarPopup.setEventListeners();
imagePopup.setEventListeners();

//Начальная загрузка профиля и постов
Promise.all([api.getProfile(), api.getPosts()])
    .then(([userData, posts]) => {
        userId = userData._id
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        avatar.src = userData.avatar;
        postSection.renderItems(posts);
    })
    .catch(err => console.log(err))

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
            .then(data => {renderPost({ data, position: 'prepend'})
            })
    };
    handleSubmit(makeUploadPost, evt, addPostPopup);
};

//==============Изменение профиля==============
//листенер кнопки изменение профиля
btnEditProfile.addEventListener('click', () => {  handleEditProfile()});

function handleEditProfile (){
   const data = userInfo.getUserInfo();
   nameInput.value = data.name;
   descriptionInput.value = data.about;
   profilePopup.open()
   
};
//листенер сабмита изменения профиля 
profilePopup.setEventListeners();

// обработчик сабмита изменения профиля
function submitPopupEdit(evt,info) {
 
    function makePatchProfile() {
        return api.patchProfile(info.name, info.description)
            .then(data => {
                userInfo.setUserInfo(data);
            })
    }
    handleSubmit(makePatchProfile, evt, profilePopup);
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

//Создание объекта поста и добаление его на страницу
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

// обработчик открытия картинки
function handleImageOpen(post) {
    imagePopup.open(post);
};

//Создание объектов класса валидации форм
const validatorEditProfile = new FormValidator(validationSettings, profilePopup.popup);
const validatorAddCard = new FormValidator(validationSettings, addPostPopup.popup);
const validatorEditAvatar = new FormValidator(validationSettings, avatarPopup.popup);

//Включение валидации форм
validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
validatorEditAvatar.enableValidation();

export {
    userId
}

