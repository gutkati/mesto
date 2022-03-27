import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
    initialCards,    //массив
    popupTypeProfile,
    popupButtonOpen,
    profileTitle,
    profileSubtitle,
    inputName,
    inputAboutMe,
    elementCard,
    popupTypeImage,
    profileAddButton,
    popupTypeCard,
    formTypeCard,
    formTypeProfile,
    config
} from "../utils/constants.js"


//typeProfile

const userInfo = new UserInfo(profileTitle, profileSubtitle)

const editProfileValidator = new FormValidator(config, formTypeProfile);
editProfileValidator.enableValidation();   //вызвать метод проверки на валидность из класса FormValidator

const typeProfilePopup = new PopupWithForm(popupTypeProfile, editProfile)
typeProfilePopup.setEventListeners();

function editProfile(data) {                    //редактирование профиля
    userInfo.setUserInfo(data);
    typeProfilePopup.close();
}

popupButtonOpen.addEventListener('click', () => {
    typeProfilePopup.open();
    const {name, about} = userInfo.getUserInfo();
    inputName.value = name;
    inputAboutMe.value = about;
    editProfileValidator.resetValidation();
});


//typeCard

const addCardValidator = new FormValidator(config, formTypeCard);
addCardValidator.enableValidation();

const typeCardPopup = new PopupWithForm(popupTypeCard, editCard)
typeCardPopup.setEventListeners();


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
    const card = new Card(item, '.element-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement
}

function editCard(object) {
    const newObject ={
        name: object.title,
        link: object.link
    }
    defaultCardList.addItem(creatCard(newObject));
    typeCardPopup.close()
}

profileAddButton.addEventListener('click', () => {
    typeCardPopup.open();
    addCardValidator.resetValidation();
});


//typeImage

const typeImagePopup = new PopupWithImage(popupTypeImage)
typeImagePopup.setEventListeners();


function handleCardClick(name, link) {
    typeImagePopup.open(name, link);
}