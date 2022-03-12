import { Card, initialCards } from './Card.js';
import { FormValidator } from './FormValidator.js';


const page = document.querySelector('.page');
const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupButtonOpen = document.querySelector('.profile__edit-button');
const popupButtonClose = document.querySelector('.popup__close');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const inputName = document.querySelector('.popup__input_theme_name');
const inputAboutMe = document.querySelector('.popup__input_theme_about-me');
const submitPopupContainer = document.querySelector('.popup__form');

const elementCard = document.querySelector('.element');  //вставлять новую разметку в код

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

const config = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__save',
        inactiveButtonClass: 'popup__save_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
};

const editProfileValidator = new FormValidator(config, popupTypeProfile);
const addCardValidator = new FormValidator(config, popupTypeCard);

editProfileValidator.enableValidation();   //вызвать метод проверки на валидность из класса FormValidator
addCardValidator.enableValidation();


function openPopup(elementName) {                  //функция открытия попапа
    elementName.classList.add('popup_opened');
    elementName.addEventListener('click', closePopupOverlay);
    page.addEventListener('keydown', closePopupEsc);
}

function closePopup(elementName) {                 //функция закрытия попапа
    elementName.classList.remove('popup_opened');
    elementName.removeEventListener('click', closePopupOverlay);
    page.removeEventListener('keydown', closePopupEsc);
}

function closePopupOverlay(evt) {       //закрывает попап при на жатии мышью в любом месте экрана
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function closePopupEsc (evt) {         //закрывает попап при нажатии на esc
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  }
}

//popup type Profile

function openPopupTypeProfile() {
    openPopup(popupTypeProfile);//функция добавляет класс для открытия popup окна
    inputName.value = profileTitle.textContent;       //вставляет текст контент из элемента profile__title в окно ввода popup__input_theme_name
    inputAboutMe.value = profileSubtitle.textContent; //вставляет текст контент из элемента profile__subtitle в окно ввода popup__input_theme_about-me

    const elementInput = popupTypeProfile.querySelectorAll(config.inputSelector);         // вызвать функцию удаления сообщений об ошибках
    elementInput.forEach((inputElement) => {
        editProfileValidator.hideInputError(inputElement)
    });

    editProfileValidator.toggleButtonState()
}

function savePopupTypeProfile(evt) {
    evt.preventDefault()
    profileTitle.textContent = inputName.value;       //заменяет текст контент из окна ввода пользователя обратно в элемент profile__title
    profileSubtitle.textContent = inputAboutMe.value; //заменяет текст контент из окна ввода пользователя обратно в элемент profile__subtitle
    closePopup(popupTypeProfile);
}

popupButtonOpen.addEventListener('click', openPopupTypeProfile);  //реакция на действия пользователя, при клике вызывает функцию,которая открывает модальное окно popup

popupButtonClose.addEventListener('click', function () {  //реакция на действия пользователя, при клике вызывает функцию,которая закрывает модальное окно popup
    closePopup(popupTypeProfile);
});

submitPopupContainer.addEventListener('submit', savePopupTypeProfile); //реакция на действия пользователя, сохраняет внесенные изменения


//добывление template-элементов на страницу

initialCards.forEach(renderElement)

function renderElement(item) {
        const card = new Card(item.name, item.link, '.element-template', openPopupTypeImage);
        const cardElement = card.generateCard();

        createCard(cardElement, elementCard);

}

function createCard(card, element) {   // функция добавляет карточку вначало
    element.prepend(card);

}

//popup type image

function openPopupTypeImage(name, link) {           //функция открывает popup TypeImage
    openPopup(popupTypeImage);
    popupTypeImagePhoto.src = link;
    popupTypeImagePhoto.alt = name;
    popupTypeImageSubtitle.textContent = name;
}

popupTypeImageClose.addEventListener('click', function () {
    closePopup(popupTypeImage);
});

//popup type card

function changeNewElement(evt) {                  //функция создает новый элемент, при введении пользователем данных в input
    evt.preventDefault()
    const newValue = {
            name: inputCardName.value,
            link: inputCardLink.value
    };
    renderElement(newValue);
    inputCardName.value = '';       //возвращает input к исходному значению
    inputCardLink.value = '';
    closePopup(popupTypeCard);
}

profileAddButton.addEventListener('click', function () {
    openPopup(popupTypeCard);
    popupSubmitTypeCard.reset();       //возвращает input к исходному значению
    const elementInput = popupTypeCard.querySelectorAll(config.inputSelector);         // вызвать функцию удаления сообщений об ошибках
    elementInput.forEach((inputElement) => {
        addCardValidator.hideInputError(inputElement)
    });

    addCardValidator.toggleButtonState()
});

popupCloseTypeCard.addEventListener('click', function () {
    closePopup(popupTypeCard);
});

popupSubmitTypeCard.addEventListener('submit', changeNewElement);