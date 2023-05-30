//--------------------> ООП валидация <-----------------------

export default class FormValidator {
    constructor(enableValidation, formElement) {
        this._formElement = formElement;
        this._inputSelector = enableValidation.inputSelector;
        this._submitButtonSelector = enableValidation.submitButtonSelector;

        this._inputErrorClass = enableValidation.inputErrorClass;
        this._errorClass = enableValidation.errorClass;
        this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
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
    _setEventListeners() {
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._formElement.addEventListener("reset", () => {
            this._disableButton();
        });
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }

    enableValidation() {

        // ?

    }
}
//------------------------------------------------------------------------------------------------
// function showInputError(formElement, inputElement, errorMessage, obj) {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(obj.inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(obj.errorClass);
// }

// function hideInputerror(formElement, inputElement, obj) {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(obj.inputErrorClass);
//     errorElement.classList.remove(obj.errorClass);
//     errorElement.textContent = "";
// }

// function checkInputValidity(formElement, inputElement, obj) {
//     if (inputElement.validity.patternMismatch) {
//         inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//     } else {
//         inputElement.setCustomValidity("");
//     }

//     if (!inputElement.validity.valid) {
//         showInputError(
//             formElement,
//             inputElement,
//             inputElement.validationMessage,
//             obj
//         );
//     } else {
//         hideInputerror(formElement, inputElement, obj);
//     }
// }

// function hasInvalidInput(inputList) {
//     return inputList.some((inputElement) => {
//         return !inputElement.validity.valid;
//     });
// }

// function disableButton(buttonElement) {
//     buttonElement.disabled = true;
// }

// function toggleButtonState(inputList, buttonElement) {
//     if (hasInvalidInput(inputList)) {
//         disableButton(buttonElement);
//     } else {
//         buttonElement.disabled = false;
//     }
// }

// function setEventListeners(formElement, obj) {
//     const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector)
//     );
//     const buttonElement = formElement.querySelector(obj.submitButtonSelector);
//     formElement.addEventListener("reset", () => {
//         disableButton(buttonElement);
//     });
//     toggleButtonState(inputList, buttonElement);
//     inputList.forEach((inputElement) => {
//         inputElement.addEventListener("input", () => {
//             checkInputValidity(formElement, inputElement, obj);
//             toggleButtonState(inputList, buttonElement);
//         });
//     });
// }

// function enableValidation(obj) {
//     const formList = Array.from(document.querySelectorAll(obj.formSelector));
//     formList.forEach((formElement) => {
//         setEventListeners(formElement, obj);
//     });
// }

//export { enableValidation, toggleButtonState };

