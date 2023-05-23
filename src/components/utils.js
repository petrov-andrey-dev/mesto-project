// утилитарные функции, которые используются в работе сразу нескольких других функций
import { closePopup } from "./modal.js";

// сброс формы после сабмита
function submitPopup(evt) {
    closePopup(evt.target.closest('.popup'));
    evt.target.reset();
};

export { submitPopup }