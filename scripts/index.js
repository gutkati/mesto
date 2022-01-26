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