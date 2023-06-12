//--------------------> ООП валидация <-----------------------

export default class FormValidator {
    constructor(validationSettings, formElement) {
        this._formElement = formElement;

        this._formSelector = validationSettings.formSelector;
        this._inputSelector = validationSettings.inputSelector;
        this._submitButtonSelector = validationSettings.submitButtonSelector;
        this._inputErrorClass = validationSettings.inputErrorClass;
        this._errorClass = validationSettings.errorClass;
    }

    //Показать ошибку
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    //Убрать ошибку
    _hideInputerror(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }

    //Проверка валидности 
    _checkInputValidity(inputElement) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("");
        }
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputerror(inputElement);
        }
    }
    //Проверка, есть хоть одно поле, которое не прошло валидацию
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }
    //Сделать кнопку неактивной при непрошедшей валидации
    disableButton() {
        this._buttonElement.disabled = true;
    }
    //Переключение кнопки с неактивной на активную
    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableButton();
        } else {
            this._buttonElement.disabled = false;
        }
    }
    enableValidation() {
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._formElement.addEventListener("reset", () => {
            this.disableButton();
        });
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }
}