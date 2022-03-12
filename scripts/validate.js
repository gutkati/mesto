<<<<<<< HEAD
const showInputError = (config, formElement, inputElement, errorMessage) => {        //  добавить модификатор ошибки
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);  //добавить уникальный класс(name-class) с префиксом error из span
=======
/*const showInputError = (config, formElement, inputElement, errorMessage) => {        //  добавить модификатор ошибки
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
>>>>>>> develop
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
}

const hideInputError = (config, formElement, inputElement) => {        // удалить модификатор ошибки
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);  //удалить name-class
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {      //проверить валидность ввода
    if (!inputElement.validity.valid) {        //если input невалидный, добавить класс с модификатором ошибки
        showInputError(config, formElement, inputElement, inputElement.validationMessage)
    } else {                                                   //иначе удалить
        hideInputError(config, formElement, inputElement)
    }
};

function hasInvalidInput(inputList) {     //проверить есть ли в массиве хоть один невалидный элемент
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(config, inputList, buttonElement) {      //меняет состояние кнопки взависимости от валидности формы
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.removeAttribute('disabled')
    }
}

function setEventListeners(config, formElement) {      //проверка инпутов на валидность
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));  //массив инпутов
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);

            toggleButtonState(config, inputList, buttonElement);
        });
    });

}
function enableValidation (config) {                //пройтись по формам и применить проверку на валидность
    const formList = Array.from(document.querySelectorAll(config.formSelector));   //массив форм
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(config, formElement);
    });
}

enableValidation(config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
<<<<<<< HEAD
  errorClass: 'popup__error_visible'
});
=======
});
*/
>>>>>>> develop
