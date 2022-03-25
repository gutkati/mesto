import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../utils/constants.js';
import { Section } from "../components/Section.js";
import  Popup  from "../components/Popup.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


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
const formTypeCard = document.querySelector('.popup__form_type_card');
const formTypeProfile = document.querySelector('.popup__form_type_profile');

const config = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__save',
        inactiveButtonClass: 'popup__save_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
};

//typeProfile
const userInfo = new UserInfo(profileTitle, profileSubtitle)

const editProfileValidator = new FormValidator(config, formTypeProfile);
editProfileValidator.enableValidation();   //вызвать метод проверки на валидность из класса FormValidator

const typeProfilePopup = new PopupWithForm(popupTypeProfile, editProfile)
typeProfilePopup.setEventListeners();

function editProfile(info) {                    //редактирование профиля
    userInfo.setUserInfo(info);
    typeProfilePopup.close();
}

popupButtonOpen.addEventListener('click', () => {
    typeProfilePopup.open();
    editProfileValidator.resetValidation();
    const {name, about} = userInfo.getUserInfo();
    inputName.value = name;
    inputAboutMe.value = about;
});




//typeCard
const addCardValidator = new FormValidator(config, formTypeCard);
addCardValidator.enableValidation();

const typeCardPopup = new PopupWithForm(popupTypeCard, editCard)
typeCardPopup.setEventListeners();

profileAddButton.addEventListener('click', () => {
    typeCardPopup.open();
    addCardValidator.resetValidation();
});

const defaultCardList = new Section(
    {
        data: initialCards,
        renderer: (cardItem) => {
            const newCard = creatCard(cardItem);

            defaultCardList.addItem(newCard);
        }
    },
        elementCard
);
defaultCardList.renderItems();

function creatCard(item) {                 //создать карточку
    const card = new Card(item.name, item.link, '.element-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement
}

function editCard(object) {                      //
    defaultCardList.addItem(creatCard(object));
    typeCardPopup.close()
}


//typeImage

const typeImagePopup = new PopupWithImage(popupTypeImage)
typeImagePopup.setEventListeners();


function handleCardClick(name, link) {
    typeImagePopup.open(name, link);
}


























/*

//popup type Profile

const typeProfile = new Popup(popupTypeProfile);



);

typeProfileForm.setEventListeners(popupButtonClose)

function openPopupTypeProfile() {        // при открытии popup вставляются данные из объекта в форму
    userInfo.getUserInfo()
    editProfileValidator.resetValidation()    // вызываем метод очитски ошибок и управление состоянием кнопки
    typeProfile.open()                      //вызван метод класс Popup
}

function savePopupTypeProfile(evt) {       //редакция данных
    evt.preventDefault()
    userInfo.setUserInfo()
    typeProfile.close()                           //вызван метод класс Popup

}



  //реакция на действия пользователя, при клике вызывает функцию,которая открывает модальное окно popup

//typeProfile.setEventListeners(popupButtonClose);    //метод класса Popup

submitPopupContainer.addEventListener('submit', savePopupTypeProfile); //реакция на действия пользователя, сохраняет внесенные изменения


//добывление template-элементов на страницу

/*initialCards.forEach(renderCard)

function creatCard(item) {
        const card = new Card(item.name, item.link, '.element-template', openPopupTypeImage);
        const cardElement = card.generateCard();

        return cardElement;

}

function renderCard(card) {   // функция добавляет карточку вначало
    elementCard.prepend(creatCard(card));

}*/




//popup type image


/*
const popupImage = new Popup(popupTypeImage);
const popupWithImage = new PopupWithImage(popupTypeImage);


/*function openPopupTypeImage(name, link) {           //функция открывает popup TypeImage
    typeImage.open();
    popupTypeImagePhoto.src = link;
    popupTypeImagePhoto.alt = name;
    popupTypeImageSubtitle.textContent = name;
}*/

/*popupTypeImageClose.addEventListener('click', function () {
    popupImage.close();
});*/
/*
popupImage.setEventListeners()

//popup type card

const typeCard = new Popup(popupTypeCard)

function changeNewElement(evt) {                  //функция создает новый элемент, при введении пользователем данных в input
    evt.preventDefault()
    const newValue = {
            name: inputCardName.value,
            link: inputCardLink.value
    };
    renderCard(newValue);
    inputCardName.value = '';       //возвращает input к исходному значению
    inputCardLink.value = '';
    typeCard.close();
}

profileAddButton.addEventListener('click', function () {

    popupSubmitTypeCard.reset();       //возвращает input к исходному значению

    addCardValidator.resetValidation()  // вызываем метод очитски ошибок и управление состоянием кнопки

    typeCard.open();
});

typeCard.setEventListeners(popupCloseTypeCard)       //метод класс Popup

popupSubmitTypeCard.addEventListener('submit', changeNewElement);
*/