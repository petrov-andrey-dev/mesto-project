import { closePopup } from "./modal.js";

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_opened');
        closePopup(openPopup);
    }
};

export { closeByEsc };