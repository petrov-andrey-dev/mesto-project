// import {
//     popupEdit,
//     nameInput,
//     descriptionInput,
//     profileName,
//     profileDescription,
//     popupImage
// } from "../index.js";
// import { openImage } from "./card.js";
//-------------------------->      ООП Popup       <------------------------------------

export default class Popup {
    // Принимает в конструктор единственный параметр — селектор попапа
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }
    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }
    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }
    //   закрытие попапа клавишей Esc
    _handleEscClose=(evt) =>{
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener("mousedown", () => this._handlePopupClose());
    }
    _handlePopupClose=(evt)=> {
        this._popup.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup_opened")) {
              this.close();
            }
        })
}
}

// закрытие попапа по Escape
// function closeByEsc(evt) {
//     if (evt.key === 'Escape') {
//         const openPopup = document.querySelector('.popup_opened');
//         closePopup(openPopup);
//     }
// };

//отрисовка кнопки сабмита на форме
// function renderSubmitBtn(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
//     if (isLoading) {
//         button.textContent = loadingText
//     } else {
//         button.textContent = buttonText
//     }
// }

//открытие попапа
// function openPopup(element) {
//     element.classList.add('popup_opened');
//     document.addEventListener('keydown', closeByEsc);
// };

//закрытие попапа
// function closePopup(element) {
//     element.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closeByEsc);
// };

// обработчик кнопки изменения профиля
// function editProfile() {
//     openPopup(popupEdit);
//     nameInput.value = profileName.textContent;
//     descriptionInput.value = profileDescription.textContent;
// };

//закрытие попапов по оверлею или крестику
// function handlePopupClose(popups) {
//     popups.forEach(item => {
//         item.addEventListener('mousedown', evt => {
//             if (evt.target.classList.contains('popup')) {
//                 closePopup(evt.target);
//             } else if (evt.target.classList.contains('popup__close')) {
//                 closePopup(evt.target.closest('.popup'));
//             }
//         });
//     });
// };

// обработчик открытия картинки
// function handleImageOpen(evt) {
//     openPopup(popupImage);
//     openImage(evt);
// };



//export {
//openPopup, closePopup, renderSubmitBtn, editProfile, handlePopupClose,
///handleImageOpen,
//     handleSubmit
//};
