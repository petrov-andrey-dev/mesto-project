import {
    popupEdit,
    nameInput,
    descriptionInput,
    profileName,
    profileDescription,
} from "../index.js";

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_opened');
        closePopup(openPopup);
    }
};

function renderSubmitBtn(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
    if (isLoading) {
        button.textContent = loadingText
    } else {
        button.textContent = buttonText
    }
}

function openPopup(element, evt) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
};

function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
};

function editProfile() {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
};

function closeByOverlay(popups) {
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


export { openPopup, closePopup, renderSubmitBtn, editProfile, closeByOverlay };