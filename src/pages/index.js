import './index.css';

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
  profileImgSelector,
  likesCountSelector,
  validationConfig
}                            from '../utils/constants.js';
import Card                  from '../components/Card.js';
import FormValidator         from '../components/FormValidator.js';
import Section               from '../components/Section.js';
import PopupWithImage        from '../components/PopupWithImage.js';
import PopupWithForm         from '../components/PopupWithForm.js';
import UserInfo              from '../components/UserInfo.js';
import Api                   from '../components/Api.js'
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Popup                 from '../components/Popup.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29/',
  headers: {
    authorization: 'af44a922-d278-427e-a751-f282a0177a52',
    'Content-Type': 'application/json'
  }
});

let userId

api
  .getAppInfo()
  .then(([userInfoRes, cardListRes]) => {
    userId = userInfoRes._id;
    userInfo.setUserInfo({
      popup_name: userInfoRes.name,
      popup_job: userInfoRes.about,
      avatar: userInfoRes.avatar
    });
    cardList.renderItems(cardListRes)

    console.log(userId);
  })
  .catch((err) => {
    console.log(`Ошибка загрузки данных: ${err}`);
  });

const userInfo = new UserInfo(profileNameSelector, profileJobSelector, profileImgSelector);

/**
 * создание экземпляра класса PopupWithForm для редактирования профиля пользователя
 * @type {PopupWithForm}
 */
const userInfoPopup = new PopupWithForm(popupEditProfileSelector, (data) => {
  api.setUserInfo(data)
    .then(userInfoRes => userInfo.setUserInfo({
      popup_name: userInfoRes.name,
      popup_job: userInfoRes.about,
      avatar: userInfoRes.avatar
    }))
    .catch((err) => {
      console.log(`Ошибка установки данных пользователя: ${err}`);
    });
});

userInfoPopup.setEventListeners();

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
    () => {
      popupConfirmation.open()
    },
    elementTemplate,
    userId
  );
  return card.createCard();
}

const popupConfirmation = new PopupWithConfirmation('.popup_type_confirmation');
popupConfirmation.setEventListeners();

/**
 * создание экземпляра класса Section для создания массива карточек
 * @type {Section}
 */
const cardList = new Section({
    renderer: (item) => {
      cardList.addItem(createNewCard(item));
    }
  }, cardSectionSelector
);

const handleCardFormSubmit = (data) => {
  api.postNewCard(data)
    .then(res => cardList.addItem(createNewCard(res))
    )
    .catch((err) => {
      console.log(`Ошибка отправки данных карточки: ${err}`);
    });
}

const newCardPopup = new PopupWithForm(popupAddCardSelector, handleCardFormSubmit);
newCardPopup.setEventListeners();

addButton.addEventListener('click', () => {
  //вызов публичного метода для очистки ошибок и управления кнопкой
  formValidAddCard.resetValidation();
  newCardPopup.open();
});

//вызов функции открытия popup редактирования профиля
editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name; //изменяем текстовые значения формы value на значения взятые в заголовке h1.profile__name
  jobInput.value = userData.job; // и p.profile__job
  //вызов публичного метода для очистки ошибок и управления кнопкой
  formValidEditProfile.resetValidation();
  userInfoPopup.open();
});


