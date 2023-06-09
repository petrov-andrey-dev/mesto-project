import "./index.css";
import {
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
    cardGrid
} from '../utils/constants';
import Card from "../components/card";
import FormValidator from "../components/FormValidator";
import Api from "../components/Api";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo";
import PopupConfirm from "../components/PopupConfirm";
import Section from "../components/Section";
import { handleSubmit } from "../utils/utils"

// переменные
let userId; //текущий userID

//Инициализация класса Api
const api = new Api(config);

//-------------->ООП UserInfo <---------------------
//создаем объект класса для получения информации из полей 
 const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');
// console.log (userInfo)

//Инициализация класса Section
const cardSection = new Section(renderCard, cardGrid);



//Создание объектов Popup
const profilePopup = new PopupWithForm(popupSelectors.popupTypeEdit, submitPopupEdit);
const addCardPopup = new PopupWithForm(popupSelectors.popupTypeAdd, sibmitPopupAdd);
const avatarPopup = new PopupWithForm(popupSelectors.popupTypeEditAvatar, submitPopupAvatar);
const imagePopup = new PopupWithImage(popupSelectors.popupTypeImage);
const confirmPopup = new PopupConfirm(popupSelectors.popupTypeDeleteCard, submitDeleteCard)

//Добавление листенеров попапам
confirmPopup.setEventListeners();
addCardPopup.setEventListeners();
avatarPopup.setEventListeners();
imagePopup.setEventListeners();

//Начальная загрузка профиля и постов
Promise.all([api.getProfile(), api.getCards()])
    .then(([userData, cards]) => {
        userId = userData._id
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        avatar.src = userData.avatar;
        cardSection.renderItems(cards);
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
btnAddCard.addEventListener('click', () => { addCardPopup.open()});

//обработчик сабмита добавления поста
function sibmitPopupAdd(evt,{link,caption}) {
    function makeUploadCard() {
        return api.uploadCard( link, caption)
            .then(data => {renderCard({ data, position: 'prepend'})
            })
    };
    handleSubmit(makeUploadCard, evt, addCardPopup);
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
function handleTrash(card) {
    confirmPopup.open();
    confirmPopup.getCard(card);
}

//обработчик сабмита удаления поста
function submitDeleteCard(card, evt) {

    console.log(card);
    function makeDeleteCard() {
        return api.deleteCard(card)
            .then(() => {
                console.log(confirmPopup.card);
                confirmPopup.card.deleteCard()
            })
    }
    handleSubmit(makeDeleteCard, evt, confirmPopup, 'Удаление...');
};

//Создание объекта поста и добаление его на страницу
function renderCard({ data, position }) {
    const newCard = new Card({ data, handleLike, handleImageOpen, handleTrash }, '#card').generateCard();
    cardSection.addItem(newCard, position);
}

//==============Установка/снятие лайка==============
// обработчик установки/снятия лайка
function handleLike(card) {
        if (!card.checkCurrentUserLike()) {
            api.putLike(card)
                .then(data => {
                    card.likes = data.likes;
                    card.toggleLike();
                    card.renderLikeCounter();
                })
                .catch(err => console.log(err))
        } else {
            api.deleteLike(card)
                .then(data => {
                    card.likes = data.likes;
                    card.toggleLike();
                    card.renderLikeCounter();
                })
                .catch(err => console.log(err))
    }
};

// обработчик открытия картинки
function handleImageOpen(card) {
    imagePopup.open(card);
};

//Создание объектов класса валидации форм
const validatorEditProfile = new FormValidator(validationSettings, profilePopup.popup);
const validatorAddCard = new FormValidator(validationSettings, addCardPopup.popup);
const validatorEditAvatar = new FormValidator(validationSettings, avatarPopup.popup);

//Включение валидации форм
validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
validatorEditAvatar.enableValidation();

export {
    userId
}

