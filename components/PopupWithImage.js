import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePhoto = this._popupSelector.querySelector('.popup__photo');
        this._imageSubtitle = this._popupSelector.querySelector('.popup__subtitle');
    }

    open(name, link) {
        super.open();
        this._imagePhoto.src = link;
        this._imagePhoto.alt = name;
        this._imageSubtitle.textContent = name;
    }

}