import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import { ConfirmationPopup } from "../components/ConfirmationPopup.js"
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
    config,
    buttonNewAvatar,
    popupTypeProfileAvatar,
    formTypeAvatar,
    popupTypeRemoveCard,
    profileAvatar,
} from "../utils/constants.js"

import '../pages/index.css';


let userId

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([res, cardServer]) => {
      userInfo.setUserInfo(res)
      userId = res._id

      cardServer.forEach(data => {
          const newCard = creatCard(data);
          defaultCardList.addItem(newCard)
      })
  })
  .catch(err => {
    console.log(err)
  });

/*api.getProfile()
    .then(res => {
        userInfo.setUserInfo(res)
        userId = res._id
    })
    .catch((err) => console.log(err))

api.getInitialCards()
    .then(cardServer => {
        //console.log('cardServer', cardServer)
        cardServer.forEach(data => {
            const newCard = creatCard(data);
            defaultCardList.addItem(newCard)
        })
    })
    .catch((err) => console.log(err))
*/

//typeProfile

const userInfo = new UserInfo(profileTitle, profileSubtitle, profileAvatar)

const editProfileValidator = new FormValidator(config, formTypeProfile);
editProfileValidator.enableValidation();   //вызвать метод проверки на валидность из класса FormValidator

const typeProfilePopup = new PopupWithForm(popupTypeProfile, editProfile)
typeProfilePopup.setEventListeners();


function editProfile(data) {//редактирование профиля
    typeProfilePopup.renderLoading(true);
    api.editProfile(data)
        .then((res) => {
           userInfo.setUserInfo(res);
           typeProfilePopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => typeProfilePopup.renderLoading(false))

}

popupButtonOpen.addEventListener('click', () => {
    typeProfilePopup.open();
    const {name, about} = userInfo.getUserInfo();
    inputName.value = name;
    inputAboutMe.value = about;
    editProfileValidator.resetValidation();
});

//popup Type Profile-Avatar

const editAvatarValidator = new FormValidator(config, formTypeAvatar);
editAvatarValidator.enableValidation();   //вызвать метод проверки на валидность из класса FormValidator

const typeProfilePopupAvatar = new PopupWithForm(popupTypeProfileAvatar, editAvatar)
typeProfilePopupAvatar.setEventListeners()

function editAvatar(data) {
    typeProfilePopupAvatar.renderLoading(true)
    api.newAvatar(data)
        .then(res => {
            userInfo.setUserInfo(res);
            typeProfilePopupAvatar.close();
        })
        .catch((err) => console.log(err))
        .finally(() => typeProfilePopupAvatar.renderLoading(false))
}

buttonNewAvatar.addEventListener('click', () => {
    typeProfilePopupAvatar.open();
    editAvatarValidator.resetValidation();
})


//typeCard

const addCardValidator = new FormValidator(config, formTypeCard);
addCardValidator.enableValidation();

const typeCardPopup = new PopupWithForm(popupTypeCard, editCard)
typeCardPopup.setEventListeners();


const defaultCardList = new Section(
    {
        data: [],
        renderer: (cardItem) => {
            const newCard = creatCard(cardItem, userId);

            defaultCardList.addItem(newCard);
        }
    },
        elementCard
);
defaultCardList.renderItems();

function creatCard(item) {                 //создать карточку
    const card = new Card(
        item,
        userId,
        '.element-template',
        handleCardClick,
        (id) => {
            typeRemoveCard.open()
            typeRemoveCard.changeSubmitHandler(() => {
                api.deleteCard(id)
                    .then(() => {
                        card.removeCard()
                        typeRemoveCard.close()
                    })
                .catch((err) => console.log(err))
            })
        },

        (id) => {
            if(card.isLiked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                        //console.log(res)
                    })
                .catch((err) => console.log(err))
            } else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                        //console.log(res)
                    })
                .catch((err) => console.log(err))
            }

        }
    );
    const cardElement = card.generateCard();
    return cardElement
}

function editCard(object) {
    typeCardPopup.renderLoading(true)
    api.addCard(object.title, object.link/*, object.likes, object._id, object.owner._id*/)
        .then((res) => {

            defaultCardList.addItem(creatCard(res, userId));
            typeCardPopup.close()
        })
        .catch((err) => console.log(err))
        .finally(() => typeCardPopup.renderLoading(false))

    object.owner = {};
    object.owner._id = userId;
    object.likes = [];



}

profileAddButton.addEventListener('click', () => {
    typeCardPopup.open();
    addCardValidator.resetValidation();
});


// popup Type Remove-card

const typeRemoveCard = new ConfirmationPopup(popupTypeRemoveCard)
typeRemoveCard.setEventListeners();     //метод закрытия кнопки


//typeImage

const typeImagePopup = new PopupWithImage(popupTypeImage)
typeImagePopup.setEventListeners();

function handleCardClick(name, link) {
    typeImagePopup.open(name, link);
}