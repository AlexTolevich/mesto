let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__form');
let closePopupButton = document.querySelector('.popup__close-button');
let nameInput = formElement.querySelector('.popup__input_is_name');
let jobInput = formElement.querySelector('.popup__input_is_job');
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')

function formSubmitHandler (evt) {   //обьявили функцию обработки сабмита
    evt.preventDefault();            //сброс дефолтных действий браузера по сабмиту
    profileName.textContent = nameInput.value;  //изменяем текстовые значения на странице в заголовке h1.profile__name
    profileJob.textContent = jobInput.value;    // и p.profile__job на значения введенные пользоателем
    closePopup();                               //вызов функции закрытия popup
}

function openPopup() {                        //обьявили функцию открытия попапа
  popup.classList.add('popup_opened');        //добавляем класс блоку popup со значением display:flex, что делает его видимым на странице
  nameInput.value = profileName.textContent;  //изменяем текстовые значения формы value на значения взятые в заголовке h1.profile__name
  jobInput.value = profileJob.textContent;    // и p.profile__job
}

function closePopup() {                       //обьявили функцию закрытия попапа
  popup.classList.remove('popup_opened');     //удаляет класс блоку popup со значением display:flex, что делает его невидимым на странице
}

editButton.addEventListener('click', openPopup);            //вызов функции открытия popup
closePopupButton.addEventListener('click', closePopup);     //вызов функции закрытия popup
formElement.addEventListener('submit', formSubmitHandler);  //вызов функции обработки сабмита
