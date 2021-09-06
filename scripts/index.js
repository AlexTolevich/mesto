// попап профиля пользователя
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
}

//обьявили функцию закрытия попапа
const closePopup = (element) => {
  element.classList.remove("popup_opened"); //удаляет класс блоку popup со значением display:flex, что делает его невидимым на странице
}

//функция загрузки значений в поля попапа из профиля со страницы
const getDefaultInfoProfile = () => {
  nameInput.value = profileName.textContent; //изменяем текстовые значения формы value на значения взятые в заголовке h1.profile__name
  jobInput.value = profileJob.textContent; // и p.profile__job
}

//функция обработки сабмита профиля
const formProfileSubmit = (evt) => {
  evt.preventDefault(); //сброс дефолтных действий браузера по сабмиту
  profileName.textContent = nameInput.value; //изменяем текстовые значения на странице в заголовке h1.profile__name
  profileJob.textContent = jobInput.value; // и p.profile__job на значения введенные пользоателем
  closePopup(popupEditProfile); //вызов функции закрытия popup
}

//вызов функции открытия popup
editButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  getDefaultInfoProfile ();
});

//вызов функции закрытия popup
closePopupButtonTypeEdit.addEventListener("click", () => {
  closePopup (popupEditProfile);
});

//вызов функции обработки сабмита
popupEditProfile.addEventListener("submit", formProfileSubmit);

addButton.addEventListener('click', () => {
  openPopup(popupAddCards);
})

closePopupButtonAddCards.addEventListener('click', () => {
  closePopup(popupAddCards);
})
