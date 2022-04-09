export class Card {
  constructor(data, userId, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handelDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

  }

  _getTemplate() {             //забираем разметку из HTML и клонтруем элемент
    const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element__item')
        .cloneNode(true);

    return cardElement;        //вернем DOM-элемент карточки
  }


  isLiked() {
  const userLikeCard = this._likes.find(user => user._id === this._userId)
      return userLikeCard
    }


  setLikes(newLikes) {
    this._likes = newLikes;
    const likeNumberElement = this._element.querySelector('.element__like-number')
    likeNumberElement.textContent = this._likes.length;

    if (this.isLiked()) {
      this._elementLike.classList.add('element__like-active');
    } else {
      this._elementLike.classList.remove('element__like-active');
    }

  }

  removeCard() {          //удалить экземпляр класса и занулить, чтобы объект карточкинеоставался впамяти приложения
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._elementLike = this._element.querySelector('.element__like');  //создать классовую переменную
    this._elementLike.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handelDeleteClick(this._id);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })
  }

  generateCard() {
    this._element = this._getTemplate();//запишем разметку в приватное поле _element, так у других элементов появится доступ к ней
    this._cardImage =  this._element.querySelector('.element__image'); // создать классовую переменную до объявления функции, в которой она используется
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;   //добавим данные
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this.setLikes(this._likes);

    if(this._ownerId !== this._userId) {     // проверить автора карточки
      this._element.querySelector('.element__delete').style.display = 'none';   //скрыть корзину на карточке
    }

    return this._element;            //вернем элемент наружу
  }

}