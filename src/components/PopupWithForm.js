import Popup from "./modal.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector(".popup__form");
        this._inputList = this._popup.querySelectorAll(".popup__text-input");
        this._handleFormSubmit = handleFormSubmit;
        this._popupButton = this._form.querySelector(".popup__submit");
        this._popupButtonTextContent = this._popupButton.textContent;
    }
    //получаем значения инпутов
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    //добавляем обработчик сабмита формы к стандартному методу
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (evt) => {
            this._handleFormSubmit(evt,this._getInputValues());
        });
    }
    //очищаем форму
    close() {
        super.close();
        this._form.reset();
    }
    //меняем текст кнопки Submit на "Сохранение..."
    renderSubmitBtn(isLoading) {
        if (isLoading) {
            this._popupButton.textContent = "Сохранение...";
        } else {
            this._popupButton.textContent = this._popupButtonTextContent;
        }
    }
}

