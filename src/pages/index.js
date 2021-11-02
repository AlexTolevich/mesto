import './index.css';

import {
  editButton,
  nameInput,
  jobInput,
  addButton,
  avatarEditButton,
  formEditProfile,
  formAddCard,
  formEditAvatar,
  popupImageSelector,
  elementTemplate,
  cardSectionSelector,
  popupAddCardSelector,
  profileNameSelector,
  profileJobSelector,
  popupEditProfileSelector,
  profileImgSelector,
  popupEditAvatarSelector,
  likeActiveSelector,
  userId,
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

/**
 * создаем экземпляр класса API
 * @type {Api}
 */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29/',
  headers: {
    authorization: 'af44a922-d278-427e-a751-f282a0177a52',
    'Content-Type': 'application/json'
  }
});

api
  .getAppInfo()
  .then(([userInfoRes, cardListRes]) => {
    userId.id = userInfoRes._id;
    userInfo.setUserInfo({
      popup_name: userInfoRes.name,
      popup_job: userInfoRes.about,
      avatar: userInfoRes.avatar
    });
    cardList.renderItems(cardListRes)
  })
  .catch((err) => {
    console.log(`Ошибка загрузки данных: ${err}`);
  });

/**
 * Создание экземпляра класса UserInfo
 * @type {UserInfo}
 */
const userInfo = new UserInfo(profileNameSelector, profileJobSelector, profileImgSelector);

//создание экземпляра класса FormValidator для каждой формы и вызов публичного метода enableValidation
const formValidEditAvatar = new FormValidator(validationConfig, formEditAvatar);
const formValidEditProfile = new FormValidator(validationConfig, formEditProfile);
const formValidAddCard = new FormValidator(validationConfig, formAddCard);
formValidEditAvatar.enableValidation();
formValidAddCard.enableValidation();
formValidEditProfile.enableValidation();

/**
 * создание экземпляра класса popup открытия просмотра фото
 * @type {PopupWithImage}
 */
const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();


const handlePreviewImage = () => {
  imagePopup.open(item.link, item.name)
}

const handleDeleteElement = () => {
  popupConfirmation.open()
  popupConfirmation.submitAction(() => {
    api.deleteCard(item)
      .then(() => {
        card.deleteElement()
        popupConfirmation.close()
      })
      .catch((err) =>
        console.log(`Ошибка удаления карточки: ${err}`));
  })
}

const handleLikeElement = (evt) => {
  if (evt.target.classList.contains(likeActiveSelector)) {
    api.delLike(item)
      .then((res) => {
        card.counterLikes(res.likes);
        evt.target.classList.remove(likeActiveSelector)
      })
      .catch((err) =>
        console.log(`Ошибка удаления лайка: ${err}`));
  } else {
    api.setLike(item)
      .then((res) => {
        card.counterLikes(res.likes);
        evt.target.classList.add(likeActiveSelector)
      })
      .catch((err) =>
        console.log(`Ошибка установки лайка: ${err}`));
  }
}

/**
 * функция создания новой карточки через создание экземпляра класса Card
 * @param item - передаваемый объект
 * @returns {createCard}
 */
function createNewCard(item) {
  const card = new Card({
      data: item
    },
    handlePreviewImage,
    handleDeleteElement,
    handleLikeElement,
    elementTemplate,
    userId
  );
  return card.createCard();
}


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

/**
 * функция колбэк сабмита формы редактирования данных пользователя
 * @param data
 */
const handleUserInfoSubmit = (data) => {
  userInfoPopup.renderLoading(true)
  api.setUserInfo(data)
    .then(userInfoRes => userInfo.setUserInfo({
      popup_name: userInfoRes.name,
      popup_job: userInfoRes.about,
      avatar: userInfoRes.avatar
    }))
    .catch((err) => {
      console.log(`Ошибка установки данных пользователя: ${err}`);
    })
    .finally(() => userInfoPopup.renderLoading(false));
  ;
}

/**
 * создание экземпляра класса PopupWithForm для редактирования профиля пользователя
 * @type {PopupWithForm}
 */
const userInfoPopup = new PopupWithForm(popupEditProfileSelector, handleUserInfoSubmit);
userInfoPopup.setEventListeners();

/**
 *функция колбэк сабмита формы редактирования аватара
 * @param data
 */
const handleAvatarFormSubmit = (data) => {
  editAvatarPopup.renderLoading(true);
  api.setAvatar(data)
    .then(userInfoRes => userInfo.setUserAvatar({
      avatar: userInfoRes.avatar
    }))
    .catch((err) => {
      console.log(`Ошибка установки аватар: ${err}`);
    })
    .finally(() => editAvatarPopup.renderLoading(false));
}

/**
 * создание экземпляра класса PopupWithForm для редактирования профиля пользователя
 * @type {PopupWithForm}
 */
const editAvatarPopup = new PopupWithForm(popupEditAvatarSelector, handleAvatarFormSubmit);
editAvatarPopup.setEventListeners();

const handleCardFormSubmit = (data) => {
  newCardPopup.renderLoading(true)
  api.postNewCard(data)
    .then(res => cardList.addItem(createNewCard(res))
    )
    .catch((err) => {
      console.log(`Ошибка отправки данных карточки: ${err}`);
    })
    .finally(() => newCardPopup.renderLoading(false));
}

const newCardPopup = new PopupWithForm(popupAddCardSelector, handleCardFormSubmit);
newCardPopup.setEventListeners();

const popupConfirmation = new PopupWithConfirmation('.popup_type_confirmation');
popupConfirmation.setEventListeners();


//вызов функции открытия popup редактирования аватар профиля
avatarEditButton.addEventListener('click', () => {
  //вызов публичного метода для очистки ошибок и управления кнопкой
  formValidEditAvatar.resetValidation();
  editAvatarPopup.open();
});

//вызов функции открытия popup добавления карточек
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
