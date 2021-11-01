//кнопки
export const editButton = document.querySelector('.profile__edit-button'); //кнопка вызова popup редактирования профиля
export const addButton = document.querySelector('.profile__add-button'); //кнопка вызова popup редактирования профиля

//поля popup редактирования профиля
export const nameInput = document.querySelector('.popup__input_is_name');
export const jobInput = document.querySelector('.popup__input_is_job');

//формы
export const formEditProfile = document.querySelector('.popup__form_type_edit-profile'); //форма редактирования профиля
export const formAddCard = document.querySelector('.popup__form_type_add'); //форма добавления карточки
export const formEditAvatar = document.querySelector('.popup__form_type_avatar'); //форма редактирования аватара

//селекторы классов popups
export const popupImageSelector = '.popup_type_full-screen';
export const popupAddCardSelector = '.popup_type_add';
export const popupEditProfileSelector = '.popup_type_edit';

//id template
export const elementTemplate = '#element-template';

//селектор секции "Галерея фотографий"
export const cardSectionSelector = '.elements';

//селекторы классов профиля
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__job';

//селектор отображения popup
export const openedPopupSelector = 'popup_opened';

//селектор закрытия popup
export const popupCloseBtnSelector = 'popup__close-button';

//селектор кнопки like
export const btnLikeSelector = '.element__like';

//селектор отображения активного like
export const likeActiveSelector = 'element__like_active';

//селектор кнопки удаления карточки
export const btnRemoveCardSelector = '.element__remove';

//селектор фото карточки
export const photoCardSelector ='.element__photo';

//селектор заголовка карточки
export const photoTitleSelector ='.element__title';

//селектор форм
export const popupFormSelector = '.popup__form';

//селектор полей ввода форм
export const popupInputSelector = '.popup__input';

//селектор описания фото popup
export const popupImgCaptionSelector = '.popup__image-caption';

//селектор фото popup
export const popupImgSelector ='.popup__image';

//селектор фото аватар
export const profileImgSelector ='.profile__avatar';

//селектор счетчика лайков
export const likesCountSelector ='.element__likes-count';

//переменная с Id пользователя
export const userId = {};

//конфигурация валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};