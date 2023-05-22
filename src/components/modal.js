const popupSubmits = document.querySelectorAll('.popup__submit');


function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_opened');
        closePopup(openPopup);
    }
};

function renderSubmitBtn(isSaving) {
    if (isSaving) {
        popupSubmits.forEach(submitBtn => {
            submitBtn.textContent = 'Сохранение...';
        });
    } else {
        popupSubmits.forEach(submitBtn => {
            submitBtn.textContent = 'Сохранить';
        });
    }
};

function openPopup(element, evt) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
};

function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
};

export { openPopup, closePopup, renderSubmitBtn };