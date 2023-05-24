import {
    popupEdit,
    nameInput,
    descriptionInput,
    profileName,
    profileDescription,
    popupImage
} from "../index.js";
import { openImage } from "./card.js";

// закрытие попапа по Escape
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_opened');
        closePopup(openPopup);
    }
};

//отрисовка кнопки сабмита на форме
function renderSubmitBtn(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
    if (isLoading) {
        button.textContent = loadingText
    } else {
        button.textContent = buttonText
    }
}

//открытие попапа
function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
};

//закрытие попапа
function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
};

//обработчик кнопки изменения профиля
function editProfile() {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
};

//закрытие попапов по оверлею или крестику
function handlePopupClose(popups) {
    popups.forEach(item => {
        item.addEventListener('mousedown', evt => {
            if (evt.target.classList.contains('popup')) {
                closePopup(evt.target);
            } else if (evt.target.classList.contains('popup__close')) {
                closePopup(evt.target.closest('.popup'));
            }
        });
    });
};

// обработчик открытия картинки
function handleImageOpen(evt) {
    openPopup(popupImage);
    openImage(evt);
};

// универсальный обработчик сабмита
function handleSubmit(request, evt, loadingText = "Сохранение...") {
    evt.preventDefault();
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderSubmitBtn(true, submitButton, initialText, loadingText);
    request()
        .then(() => {
            closePopup(evt.target.closest('.popup'));
            evt.target.reset();
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderSubmitBtn(false, submitButton, initialText);
        });
};

export { openPopup, closePopup, renderSubmitBtn, editProfile, handlePopupClose, handleImageOpen, handleSubmit };