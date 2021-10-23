import './index.css';

import {initialCards} from '../utils/initial-cards.js';
import {
  editButton,
  nameInput,
  jobInput,
  addButton,
  formEditProfile,
  formAddCard,
  popupImageSelector,
  elementTemplate,
  cardSectionSelector,
  popupAddCardSelector,
  profileNameSelector,
  profileJobSelector,
  popupEditProfileSelector,
  validationConfig
}                     from '../utils/constants.js';
import Card           from '../components/Card.js';
import FormValidator  from '../components/FormValidator.js';
import Section        from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm  from '../components/PopupWithForm.js';
import UserInfo       from '../components/UserInfo.js';

//создание экземпляра класса FormValidator для каждой формы и вызов публичного метода enableValidation
const formValidEditProfile = new FormValidator(validationConfig, formEditProfile);
const formValidAddCard = new FormValidator(validationConfig, formAddCard);
formValidAddCard.enableValidation();
formValidEditProfile.enableValidation();

/**
 * создание экземпляра класса popup открытия просмотра фото
 * @type {PopupWithImage}
 */
const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

/**
 * функция создания новой карточки через создание экземпляра класса Card
 * @param item - передаваемый объект
 * @returns {createCard}
 */
function createNewCard(item) {
  const card = new Card({
      data: item
    },
    () => {
      imagePopup.open(item.link, item.name)
    },
    elementTemplate
  );
  return card.createCard();
}

/**
 * создание экземпляра класса Section для создания массива карточек
 * @type {Section}
 */
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(createNewCard(item));
    }
  }, cardSectionSelector
);

cardList.renderItems();

const handleCardFormSubmit = (data) => {
  cardList.addItem(createNewCard(data));
}

const newCardPopup = new PopupWithForm(popupAddCardSelector, handleCardFormSubmit);
newCardPopup.setEventListeners();

addButton.addEventListener('click', () => {
  //вызов публичного метода для очистки ошибок и управления кнопкой
  formValidAddCard.resetValidation();
  newCardPopup.open();
});

const userInfo = new UserInfo(profileNameSelector, profileJobSelector);

const userInfoPopup = new PopupWithForm(popupEditProfileSelector, (data) => {
  userInfo.setUserInfo(data);
});
userInfoPopup.setEventListeners();

//вызов функции открытия popup редактирования профиля
editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name; //изменяем текстовые значения формы value на значения взятые в заголовке h1.profile__name
  jobInput.value = userData.job; // и p.profile__job
  //вызов публичного метода для очистки ошибок и управления кнопкой
  formValidEditProfile.resetValidation();
  userInfoPopup.open();
});
