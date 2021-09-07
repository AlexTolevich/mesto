const popupEditProfile = document.querySelector(".popup_type_edit"); //попап редактирования профиля
const editButton = document.querySelector(".profile__edit-button"); //кнопка вызова попапа редактироования профиля
const closePopupButtonTypeEdit = document.querySelector(".popup__close-button_type_edit"); //кнопка закрытия попапа редактирования профиля
const nameInput = document.querySelector(".popup__input_is_name");
const jobInput = document.querySelector(".popup__input_is_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const popupAddCards = document.querySelector(".popup_type_add"); //попап добавления карточек
const addButton = document.querySelector(".profile__add-button"); //кнопка вызова попапа редактироования профиля
const closePopupButtonAddCards = document.querySelector(".popup__close-button_type_add"); //кнопка закрытия попапа профиля
const placeNameInput = document.querySelector(".popup__input_is_place-name");
const imgLinkInput = document.querySelector(".popup__input_is_img-link");
const formAddCards = document.querySelector(".popup__form_type_add"); //форма добавления карточки
const popupImage = document.querySelector(".popup_type_full-screen");
const closePopupButtonImage = document.querySelector(".popup__close-button_type_full-screen");
const elements = document.querySelector(".elements"); //секция для добавления карточек
const elementTemplate = document.querySelector("#element-template").content; //template карточки

//массив данных для стартовых карточек
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//обьявили функцию открытия попапа
const openPopup = (element) => {
  element.classList.add("popup_opened"); //добавляем класс блоку popup со значением display:flex, что делает его видимым на странице
};

//обьявили функцию закрытия попапа
const closePopup = (element) => {
  element.classList.remove("popup_opened"); //удаляет класс блоку popup со значением display:flex, что делает его невидимым на странице
};

//функция загрузки значений в поля попапа из профиля со страницы
const getDefaultInfoProfile = () => {
  nameInput.value = profileName.textContent; //изменяем текстовые значения формы value на значения взятые в заголовке h1.profile__name
  jobInput.value = profileJob.textContent; // и p.profile__job
};

//функция обработки сабмита профиля
const formProfileSubmit = (evt) => {
  evt.preventDefault(); //сброс дефолтных действий браузера по сабмиту
  profileName.textContent = nameInput.value; //изменяем текстовые значения на странице в заголовке h1.profile__name
  profileJob.textContent = jobInput.value; // и p.profile__job на значения введенные пользоателем
  closePopup(popupEditProfile); //вызов функции закрытия popup
};

//функция открытия просмотра фото на полный экран
const openFullScreenImage = (event) => {
  const photoElement = document.querySelector(".popup__image");
  const captionImageElement = document.querySelector(".popup__image-caption");
  photoElement.src = event.target.closest(".element__photo").src;
  photoElement.alt = event.target.closest(".element__photo").alt;
  captionImageElement.textContent = event.target
    .closest(".element")
    .querySelector(".element__title").textContent;
  openPopup(popupImage);
};

//функция добавления карточек
const addElement = (card) => {
  const elementCard = elementTemplate.querySelector(".element").cloneNode(true);
  elementCard.querySelector(".element__photo").src = card.link;
  elementCard.querySelector(".element__photo").alt = card.name;
  elementCard.querySelector(".element__title").textContent = card.name;
  elementCard
    .querySelector(".element__like")
    .addEventListener("click", handlerLikeElement); //слушатель кнопки element__like
  elementCard
    .querySelector(".element__remove")
    .addEventListener("click", removeElement); //слушатель кнопки element__remove
  elementCard
    .querySelector(".element__photo")
    .addEventListener("click", openFullScreenImage);
  return elementCard;
};

//функция отрисовки добавленной карточки
const renderCard = (card) => {
  elements.prepend(addElement(card));
};

//функция снятия/установки like
const handlerLikeElement = (event) => {
  event.target.classList.toggle("element__like_active");
};

//функция удаления карточки
const removeElement = (event) => {
  event.target.closest(".element").remove();
};

//отрисовка стартовых карточек из массива
initialCards.forEach((card) => {
  renderCard(card);
});

//функция обработки сабмита добавления карточки
const formAddSubmit = (evt) => {
  evt.preventDefault();
  renderCard({
    name: placeNameInput.value,
    link: imgLinkInput.value,
  });
  formAddCards.reset();
  closePopup(popupAddCards);
};

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
popupEditProfile.addEventListener("submit", formProfileSubmit);

//вызов функции открытия popup добавления карточки
addButton.addEventListener("click", () => {
  openPopup(popupAddCards);
});

//вызов функции закрытия popup добавления карточки
closePopupButtonAddCards.addEventListener("click", () => {
  closePopup(popupAddCards);
});

//вызов функции обработки сабмита добавления карточки
popupAddCards.addEventListener("submit", formAddSubmit);