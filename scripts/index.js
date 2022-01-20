let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let inputName = document.querySelector('.popup__input-name');
let inputAboutMe = document.querySelector('.popup__input-about-me');
let savePopupButton = document.querySelector('.popup__save');
let submitPopupContainer = document.querySelector('.popup__container');

function openPopup() {
    popup.classList.add('popup_opened');
    inputName.value = profileTitle.textContent;
    inputAboutMe.value = profileSubtitle.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function savePopup(evt) {
    evt.preventDefault()
    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputAboutMe.value;
}

openPopupButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);

submitPopupContainer.addEventListener('submit', savePopup);

savePopupButton.addEventListener('click', closePopup);