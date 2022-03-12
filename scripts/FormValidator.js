export class FormValidator {
    constructor(data, formElement) {
        this._data = data;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._data.inputSelector));  //массив инпутов
        this._buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);
    }



    _showInputError(inputElement, errorMessage) {        //  добавить модификатор ошибки
        const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.add(this._data.inputErrorClass);
        errorElement.classList.add(this._data.errorClass);
        errorElement.textContent = errorMessage;
    }

    hideInputError(inputElement) {        // удалить модификатор ошибки
        const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.remove(this._data.inputErrorClass);
        errorElement.classList.remove(this._data.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {      //проверить валидность ввода
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage)
        } else {
            this.hideInputError(inputElement);
        }
    };

    _hasInvalidInput() {     //проверить есть ли в массиве хоть один невалидный элемент
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    toggleButtonState() {      //меняет состояние кнопки взависимости от валидности формы
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._data.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', '');
        } else {
            this._buttonElement.classList.remove(this._data.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled')
        }
    }

    _setEventListeners() {      //проверка инпутов на валидность

        this.toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input',() => {
                this._checkInputValidity(inputElement);

                this.toggleButtonState();
            });
        });

    }

    enableValidation() {                //пройтись по формам и применить проверку на валидность
            this._formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this._setEventListeners();
    }

}