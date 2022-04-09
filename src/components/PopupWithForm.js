import Popup from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupSelector.querySelector('.popup__form');
        this._popupButtonSave = this._popupForm.querySelector('.popup__save');
    }

    _getInputValues() {
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.id] = input.value;
        });

        return this._formValues;
    }

    changeSubmitHandler(newSubmitHandler) {
        this._handleFormSubmit = newSubmitHandler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    renderLoading(isLoading) {
        if(isLoading) {
            this._popupButtonSave.textContent = 'Сохранение...'
        } else {
            this._popupButtonSave.textContent = 'Сохранить'
        }
    }
}