export class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._element = this._getTemplate();//запишем разметку в приватное поле _element, так у других элементов появится доступ к ней
    this._cardImage =  this._element.querySelector('.element__image'); // создать классовую переменную до объявления функции, в которой она используется
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;   //добавим данные
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;            //вернем элемент наружу
  }


  _likePut() {
    this._elementLike.classList.toggle('element__like-active');
  }

  _basketDelete() {          //удалить экземпляр класса и занулить, чтобы объект карточкинеоставался впамяти приложения
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._elementLike = this._element.querySelector('.element__like');  //создать классовую переменную
    this._elementLike.addEventListener('click', () => {
      this._likePut();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._basketDelete();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

}