function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_opened');
        closePopup(openPopup);
    }
};

function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
};

function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
};

export { openPopup, closePopup };