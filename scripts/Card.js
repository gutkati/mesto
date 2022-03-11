export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export class Card {
  constructor(name, link, cardSelector, openPopupTypeImage) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._openPopupTypeImage = openPopupTypeImage;
  }

  _getTemplate() {             //забираем разметку из HTML и клонтруем элемент
    const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element__item')
        .cloneNode(true);

    return cardElement;        //вернем DOM-элемент карточки
  }

  generateCard() {
    this._element = this._getTemplate();   //запишем разметку в приватное поле _element, так у других элементов появится доступ к ней
    this._addListeners();

    this._element.querySelector('.element__title').textContent = this._name;   //добавим данные
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;            //вернем элемент наружу
  }

  _likePut() {
    this._element.querySelector('.element__like').classList.toggle('element__like-active');
  }

  _basketDelete() {
    this._element.querySelector('.element__delete').closest('.element__item').remove();
  }

  _addListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likePut();
    });
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._basketDelete();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopupTypeImage(this._name, this._link);
    });
  }

}