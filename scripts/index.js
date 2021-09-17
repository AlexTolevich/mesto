const popupEditProfile = document.querySelector(".popup_type_edit"); //попап редактирования профиля
const editButton = document.querySelector(".profile__edit-button"); //кнопка вызова попапа редактироования профиля
const closePopupButtonTypeEdit = document.querySelector(".popup__close-button_type_edit"); //кнопка закрытия попапа редактирования профиля
const nameInput = document.querySelector(".popup__input_is_name");
const jobInput = document.querySelector(".popup__input_is_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const popupAddCard = document.querySelector(".popup_type_add"); //попап добавления карточек
const addButton = document.querySelector(".profile__add-button"); //кнопка вызова попапа редактироования профиля
const closePopupButtonAddCard = document.querySelector(".popup__close-button_type_add"); //кнопка закрытия попапа профиля
const placeNameInput = document.querySelector(".popup__input_is_place-name");
const imgLinkInput = document.querySelector(".popup__input_is_img-link");
const formAddCard = document.querySelector(".popup__form_type_add"); //форма добавления карточки
const popupImage = document.querySelector(".popup_type_full-screen");
const closePopupButtonImage = document.querySelector(".popup__close-button_type_full-screen");
const cardContainer = document.querySelector(".elements"); //секция для добавления карточек
const elementTemplate = document.querySelector("#element-template").content; //template карточки

//функция открытия попапа
const openPopup = (element) => {
  element.classList.add("popup_opened"); //добавляем класс блоку popup со значением display:flex, что делает его видимым на странице
  document.addEventListener("keydown", closePopupEscClick); //добавляем слушатель нажатия кнопок клавиатуры при открытии попап
  element.addEventListener("mousedown", closePopupOverlayClick); //добавляем слушатель нажатия кнопки мыши при открытии попап
};

//функция закрытия попапа
const closePopup = (element) => {
  element.classList.remove("popup_opened"); //удаляет класс блоку popup со значением display:flex, что делает его невидимым на странице
  document.removeEventListener("keydown", closePopupEscClick); //удаляем слушатель нажатия кнопок клавиатуры при закрытии попап
  element.removeEventListener("mousedown", closePopupOverlayClick); //удаляем слушатель нажатия кнопки мыши при закрытии попап
};

//функция закрытия попап по esc
const closePopupEscClick = (evt) => {
  if (evt.key === "Escape") { //определяем нажатие escape
    closePopup(document.querySelector(".popup_opened")); //находим элемент открытого попап и передаем его как аргумент функции закрытия попап
  }
};

//функция закрытия попап кликом на "оверлей"
const closePopupOverlayClick = (evt) => {
  if (evt.target.classList.contains("popup_opened")) { //определяем нажатие мыши на оверлай открытого попап
    closePopup(document.querySelector(".popup_opened")); //находим элемент открытого попап и передаем его как аргумент функции закрытия попап
  }
};

//функция загрузки значений в поля попапа из профиля со страницы
const getDefaultInfoProfile = () => {
  nameInput.value = profileName.textContent; //изменяем текстовые значения формы value на значения взятые в заголовке h1.profile__name
  jobInput.value = profileJob.textContent; // и p.profile__job
};

//функция обработки сабмита профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); //сброс дефолтных действий браузера по сабмиту
  profileName.textContent = nameInput.value; //изменяем текстовые значения на странице в заголовке h1.profile__name
  profileJob.textContent = jobInput.value; // и p.profile__job на значения введенные пользоателем
  closePopup(popupEditProfile); //вызов функции закрытия popup
};

//функция открытия просмотра фото на полный экран
const handlePreviewImage = (event) => {
  const photoElement = document.querySelector(".popup__image");
  const captionImageElement = document.querySelector(".popup__image-caption");
  photoElement.src = event.target.closest(".element__photo").src;
  photoElement.alt = event.target.closest(".element__photo").alt;
  captionImageElement.textContent = event.target.closest(".element").querySelector(".element__title").textContent;
  openPopup(popupImage);
};

//функция добавления карточек
const createCard = (card) => {
  const elementCard = elementTemplate.querySelector(".element").cloneNode(true);
  elementCard.querySelector(".element__photo").src = card.link;
  elementCard.querySelector(".element__photo").alt = card.name;
  elementCard.querySelector(".element__title").textContent = card.name;
  elementCard.querySelector(".element__like").addEventListener("click", handleLikeElement); //слушатель кнопки element__like
  elementCard.querySelector(".element__remove").addEventListener("click", handleDeleteElement); //слушатель кнопки element__remove
  elementCard.querySelector(".element__photo").addEventListener("click", handlePreviewImage);
  return elementCard;
};

//функция отрисовки добавленной карточки
const renderCard = (card) => {
  cardContainer.prepend(createCard(card));
};

//функция снятия/установки like
const handleLikeElement = (event) => {
  event.target.classList.toggle("element__like_active");
};

//функция удаления карточки
const handleDeleteElement = (event) => {
  event.target.closest(".element").remove();
};

//функция обработки сабмита добавления карточки
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard({
    name: placeNameInput.value,
    link: imgLinkInput.value,
  });
  formAddCard.reset();
  closePopup(popupAddCard);
  const buttonAddCard = popupAddCard.querySelector('.popup__button');
  buttonAddCard.classList.add('popup__button_disabled'); //блокируем кнопку после сабмита
  buttonAddCard.setAttribute("disabled", ""); //блокируем кнопку после сабмита
};

//отрисовка стартовых карточек из массива
initialCards.forEach((card) => {
  renderCard(card);
});

//вызов функции закрытия popup просмотра фото
closePopupButtonImage.addEventListener("click", () => {
  closePopup(popupImage);
});

//вызов функции открытия popup редактировния профиля
editButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  getDefaultInfoProfile();
});

//вызов функции закрытия popup редактировния профиля
closePopupButtonTypeEdit.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

//вызов функции обработки сабмита редактирования профиля
popupEditProfile.addEventListener("submit", handleProfileFormSubmit);

//вызов функции открытия popup добавления карточки
addButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

//вызов функции закрытия popup добавления карточки
closePopupButtonAddCard.addEventListener("click", () => {
  closePopup(popupAddCard);
});

//вызов функции обработки сабмита добавления карточки
popupAddCard.addEventListener("submit", handleCardFormSubmit);

//конфигурация валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//вызов функции валидации
enableValidation(validationConfig);
