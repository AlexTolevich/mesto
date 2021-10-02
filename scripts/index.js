import Card           from './Card.js';
import {initialCards} from './initial-cards.js';
import FormValidator  from './FormValidator.js';

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit'); //попап редактирования профиля
const editButton = document.querySelector('.profile__edit-button'); //кнопка вызова попапа редактирования профиля
const nameInput = document.querySelector('.popup__input_is_name');
const jobInput = document.querySelector('.popup__input_is_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupAddCard = document.querySelector('.popup_type_add'); //попап добавления карточек
const addButton = document.querySelector('.profile__add-button'); //кнопка вызова попапа редактирования профиля
const placeNameInput = document.querySelector('.popup__input_is_place-name');
const imgLinkInput = document.querySelector('.popup__input_is_img-link');
const popupImage = document.querySelector('.popup_type_full-screen');
const cardSection = document.querySelector('.elements'); //секция для добавления карточек
const formEditProfile = document.querySelector('.popup__form_type_edit-profile'); //форма редактирования профиля
const formAddCard = document.querySelector('.popup__form_type_add'); //форма добавления карточки
const photoElement = document.querySelector('.popup__image');
const captionImageElement = document.querySelector('.popup__image-caption');

// функция открытия попапа
const openPopup = (element) => {
  element.classList.add('popup_opened'); //добавляем класс блоку popup со значением display:flex, что делает его видимым на странице
  document.addEventListener('keydown', closePopupEscClick); //добавляем слушатель нажатия кнопок клавиатуры при открытии попап
};

// функция закрытия попапа
const closePopup = (element) => {
  element.classList.remove('popup_opened'); //удаляет класс блоку popup со значением display:flex, что делает его невидимым на странице
  document.removeEventListener('keydown', closePopupEscClick); //удаляем слушатель нажатия кнопок клавиатуры при закрытии попап
};

// функция закрытия попап по esc
const closePopupEscClick = (evt) => {
  if (evt.key === 'Escape') { //определяем нажатие escape
    closePopup(document.querySelector('.popup_opened')); //находим элемент открытого попап и передаем его как аргумент функции закрытия попап
  }
};

//добавление слушателей на попапы для закрытия кликом на 'оверлей' и по кнопке закрыть
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

//функция загрузки значений в поля попапа из профиля со страницы
const getDefaultInfoProfile = () => {
  nameInput.value = profileName.textContent; //изменяем текстовые значения формы value на значения взятые в заголовке h1.profile__name
  jobInput.value = profileJob.textContent; // и p.profile__job
};

//функция обработки сабмита профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); //сброс дефолтных действий браузера по сабмит
  profileName.textContent = nameInput.value; //изменяем текстовые значения на странице в заголовке h1.profile__name
  profileJob.textContent = jobInput.value; // и p.profile__job на значения введенные пользователем
  closePopup(popupEditProfile); //вызов функции закрытия popup
};

//функция открытия просмотра фото на полный экран
const handlePreviewImage = (name, link) => {
  photoElement.src = link;
  photoElement.alt = name;
  captionImageElement.textContent = name;
  openPopup(popupImage);
};

//функция создания карточки
const createCard = (data) => {
  const card = new Card(data, '#element-template', handlePreviewImage);
  return card.createCard();
}

//функция добавления карточки вразметку
const renderCard = (data, cardSection) => {
  const cardElement = createCard(data);
  cardSection.prepend(cardElement);
};

//отрисовка стартовых карточек из массива
initialCards.forEach((item) => {
  renderCard(item, cardSection);
});

//функция обработки сабмита добавления карточки
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard({
    name: placeNameInput.value,
    link: imgLinkInput.value,
  }, cardSection);
  formAddCard.reset();
  closePopup(popupAddCard);
};

//вызов функции открытия popup редактирования профиля
editButton.addEventListener('click', () => {
  getDefaultInfoProfile();
  //вызов публичного метода для очистки ошибок и управления кнопкой
  formValidEditProfile.resetValidation();
  openPopup(popupEditProfile);
});

//вызов функции обработки сабмита редактирования профиля
popupEditProfile.addEventListener('submit', handleProfileFormSubmit);

//вызов функции открытия popup добавления карточки
addButton.addEventListener('click', () => {
  //вызов публичного метода для очистки ошибок и управления кнопкой
  formValidAddCard.resetValidation();
  openPopup(popupAddCard);
});

//вызов функции обработки сабмита добавления карточки
popupAddCard.addEventListener('submit', handleCardFormSubmit);

//конфигурация валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//создание экземпляра класса FormValidator для каждой формы и вызов публичного метода enableValidation
const formValidEditProfile = new FormValidator(validationConfig, formEditProfile);
const formValidAddCard = new FormValidator(validationConfig, formAddCard);
formValidAddCard.enableValidation();
formValidEditProfile.enableValidation();