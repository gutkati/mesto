//проектная работа 4

const popup = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const inputName = document.querySelector('.popup__input_theme_name');
const inputAboutMe = document.querySelector('.popup__input_theme_about-me');
const submitPopupContainer = document.querySelector('.popup__form');

function openClosePopup(elementName) {           //функция открытия и закрытия popup
    elementName.classList.toggle('popup_opened');
}

function openPopup() {
    openClosePopup(popup);                             //функция добавляет класс для открытия popup окна
    inputName.value = profileTitle.textContent;       //вставляет текст контент из элемента profile__title в окно ввода popup__input_theme_name
    inputAboutMe.value = profileSubtitle.textContent; //вставляет текст контент из элемента profile__subtitle в окно ввода popup__input_theme_about-me
}

function savePopup(evt) {
    evt.preventDefault()
    profileTitle.textContent = inputName.value;       //заменяет текст контент из окна ввода пользователя обратно в элемент profile__title
    profileSubtitle.textContent = inputAboutMe.value; //заменяет текст контент из окна ввода пользователя обратно в элемент profile__subtitle
    openClosePopup(popup)
}

openPopupButton.addEventListener('click', openPopup);  //реакция на действия пользователя, при клике вызывает функцию,которая открывает модальное окно popup

closePopupButton.addEventListener('click', function () {  //реакция на действия пользователя, при клике вызывает функцию,которая закрывает модальное окно popup
    openClosePopup(popup);
});

submitPopupContainer.addEventListener('submit', savePopup); //реакция на действия пользователя, сохраняет внесенные изменения


//Пректная работа 5

const elementTemplate = document.querySelector('.element-template').content; // вытащили контент template
const element = document.querySelector('.element');  //вставлять новую разметку в код

const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeImagePhoto = document.querySelector('.popup__photo');
const popupTypeImageSubtitle = document.querySelector('.popup__subtitle');
const popupTypeImageClose = document.querySelector('.popup__close_type_image');

const profileAddButton = document.querySelector('.profile__add-button');

const popupTypeCard = document.querySelector('.popup_type_card');
const popupCloseTypeCard = document.querySelector('.popup__close_type_card');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_card-link');
const popupSubmitTypeCard = document.querySelector('.popup__form_type_card');


function render() {                          //функция перебирает элементы массива
    initialCards.forEach(renderElement);//пройтись по каждому пункту массива и применить к нему функцию renderElement
}

function renderElement (el) {   // функция создает карточку (renderCard) и добавляет в начало (createCard)
    const newCard = renderCard(el);
    createCard(newCard, element);
}

function renderCard(el) {                // функция создает карточку с обработчиками
    const newCard = elementTemplate.cloneNode(true);       // клонирует разметку, которая лежит в template со всем содержимым
    newCard.querySelector('.element__title').textContent = el.name;//вытаскивает элемент из кода и в его атрибут подставляем нужное значение из массива
    newCard.querySelector('.element__image').src = el.link;
    newCard.querySelector('.element__image').alt = el.name;
    addListeners(newCard);                //вызывает функцию обработчиков
    return(newCard);
}


function createCard(card, element) {   // функция добавляет карточку вначало
    element.prepend(card);

}

function addListeners(element) {                //функция добавляет обработчики на елемент

    element.querySelector('.element__like').addEventListener('click', likePut);  //при нажатии делает лайк активным
    element.querySelector('.element__delete').addEventListener('click', basketDelete);  //при на жатии на корзину удаляет элемент
    element.querySelector('.element__image').addEventListener('click', popupTypeImageOpen); //при нажатии открывает popup TypeImage
}


function likePut(event) {                    //функция добавляет и удаляет класс для активного лайка
    event.target.classList.toggle('element__like-active');
}

function basketDelete (event) {              //удаляет элемент со страницы
    event.target.closest('.element__item').remove();
}

function popupTypeImageOpen(event) {           //функция открывает popup TypeImage
    openClosePopup(popupTypeImage);
    popupTypeImagePhoto.src = event.target.src;
    popupTypeImagePhoto.alt = event.target.alt
    popupTypeImageSubtitle.textContent = event.target.alt;
}

function changeNewElement(evt) {                  //функция создает новый элемент, при введении пользователем данных в input
    evt.preventDefault()
    const newValue = {
            name: inputCardName.value,
            link: inputCardLink.value
        };
    renderElement(newValue);
    inputCardName.value = '';       //возвращает input вернуть к исходному значению
    inputCardLink.value = '';
    openClosePopup(popupTypeCard);
}

popupTypeImageClose.addEventListener('click', function () {
    openClosePopup(popupTypeImage);
});

profileAddButton.addEventListener('click', function () {
    openClosePopup(popupTypeCard);
});

popupCloseTypeCard.addEventListener('click', function () {
    openClosePopup(popupTypeCard);
});

popupSubmitTypeCard.addEventListener('submit', changeNewElement);

render()