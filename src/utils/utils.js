// утилитарные функции, которые используются в работе сразу нескольких других функций

// универсальный обработчик сабмита
export function handleSubmit(request, evt, objPopup, loadingText = "Сохранение...") {
    evt.preventDefault();
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderSubmitBtn(true, submitButton, initialText, loadingText);
    request()
        .then(() => {
            objPopup.close();
            evt.target.reset();
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderSubmitBtn(false, submitButton, initialText);
        });
};

//отрисовка кнопки сабмита на форме
function renderSubmitBtn(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
    if (isLoading) {
        button.textContent = loadingText
    } else {
        button.textContent = buttonText
    }
}