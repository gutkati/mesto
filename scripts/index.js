//Проектная работа 4

let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let inputName = document.querySelector('.popup__input_theme_name');
let inputAboutMe = document.querySelector('.popup__input_theme_about-me');
let submitPopupContainer = document.querySelector('.popup__form');


function openPopup() {
    popup.classList.add('popup_opened');              //функция добавляет класс для открытия popup окна
    inputName.value = profileTitle.textContent;       //вставляет текст контент из элемента profile__title в окно ввода popup__input_theme_name
    inputAboutMe.value = profileSubtitle.textContent; //вставляет текст контент из элемента profile__subtitle в окно ввода popup__input_theme_about-me
}

function closePopup() {
    popup.classList.remove('popup_opened');    //функция удаляет класс для открытия popup окна
}

function savePopup(evt) {
    evt.preventDefault()
    profileTitle.textContent = inputName.value;       //заменяет текст контент из окна ввода пользователя обратно в элемент profile__title
    profileSubtitle.textContent = inputAboutMe.value; //заменяет текст контент из окна ввода пользователя обратно в элемент profile__subtitle
    closePopup()
}

openPopupButton.addEventListener('click', openPopup);  //реакция на действия пользователя, при клике вызывает функцию,которая открывает модальное окно popup

closePopupButton.addEventListener('click', closePopup); //реакция на действия пользователя, при клике вызывает функцию,которая закрывает модальное окно popup

submitPopupContainer.addEventListener('submit', savePopup); //реакция на действия пользователя, сохраняет внесенные изменения


//Пректная работа 5

const initialCards = [
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


const elementTemplate = document.querySelector('.element-template').content; // вытащили контент template
const element = document.querySelector('.element');  //вставлять новую разметку в код
const popupBigImage = document.querySelector('.popup-big-image');
const popupBigImagePhoto = document.querySelector('.popup-big-image__photo');
const popupBigImageSubtitle = document.querySelector('.popup-big-image__subtitle');
const popupBigImageClose = document.querySelector('.popup-big-image__close');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeCard = document.querySelector('.popup_type_card');
const popupCloseTypeCard = document.querySelector('.popup__close_type_card');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_card-link');
const popupSubmitTypeCard = document.querySelector('.popup__form_type_card');
const popupChangeTypeCard = document.querySelector('.popup__save_type_card');


function render() {                          //функция перебирает элементы массива
    initialCards.forEach(renderCard);       //пройтись по каждому пункту массива и применить к нему функцию добавления кода
}

function renderCard(el) {                // добавляет HTML код из template
    const newCard = elementTemplate.cloneNode(true);       // клонирует разметку, которая лежит в template со всем содержимым
    newCard.querySelector('.element__title').textContent = el.name;  //вытаскивает элемент из кода и в его атрибут подставляем нужное значение из массива
    newCard.querySelector('.element__image').src = el.link;
    newCard.querySelector('.element__like').addEventListener('click', function (event) {   //при нажатии делает лайк активным
        event.target.classList.toggle('element__like-active');
    });
    newCard.querySelector('.element__delete').addEventListener('click', function (event) {   //при на жатии на корзину удаляет элемент
        event.target.closest('.element__item').remove();
    });

    newCard.querySelector('.element__image').addEventListener('click', function (event) {   // при нажатии на картинку всплывает popup bigImage
        popupBigImage.classList.toggle('popup-big-image_opened');
        popupBigImagePhoto.src = el.link;
        popupBigImageSubtitle.textContent = el.name;
    });

    element.appendChild(newCard);          // вставляет склонированную разметку в код

}


render()


function ClosePopupBigImage() {                    //функция закрывает popup BigImage
    popupBigImage.classList.toggle('popup-big-image_opened');
}

function openClosePopupTypeCard() {                //функция открывает и закрывает popup  TypeCard
    popupTypeCard.classList.toggle('popup_opened');
}

function changeNewElement(evt) {
    evt.preventDefault()
    const newElement = elementTemplate.cloneNode(true);       // клонирует разметку, которая лежит в template со всем содержимым
    newElement.querySelector('.element__title').textContent = inputCardName.value;  //вытаскивет элемент из кода и в его атрибут подставляем нужное значение из массива
    newElement.querySelector('.element__image').src = inputCardLink.value;
    newElement.querySelector('.element__like').addEventListener('click', function (event) {   //при нажатии делает лайк активным
        event.target.classList.toggle('element__like-active');
    });
    newElement.querySelector('.element__delete').addEventListener('click', function (event) {   //при на жатии на корзину удаляет элемент
        event.target.closest('.element__item').remove();
    });
    element.prepend(newElement);    //добавить элемент первым на страницу
    inputCardName.value = '';
    inputCardLink.value = '';
    openClosePopupTypeCard()        //вызвать функцию закрытия popup
}

profileAddButton.addEventListener('click', openClosePopupTypeCard);
popupCloseTypeCard.addEventListener('click', openClosePopupTypeCard);
popupBigImageClose.addEventListener('click', ClosePopupBigImage);
popupSubmitTypeCard.addEventListener('submit', changeNewElement);