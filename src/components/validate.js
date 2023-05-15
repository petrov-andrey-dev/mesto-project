function showInputError(formElement, inputElement, errorMessage, obj) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
}

function hideInputerror(formElement, inputElement, obj) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, obj) {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputerror(formElement, inputElement, obj);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
    }
} 

function setEventListeners(formElement, obj) {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement)
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, obj);
            toggleButtonState(inputList, buttonElement);
        })
    });
}

export function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, obj);
    })
}