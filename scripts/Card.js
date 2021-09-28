export default class Card {

  constructor (data, elementTemplate) {
    this._elementTemplate = elementTemplate;
    this._nameCard = data.name;
    this._linkCard = data.link;
  }

  //приватный метод загрузки шаблона document
  //       .querySelector(this._elementTemplate)
  //       .content
  _getTemplate () {
    return this._elementTemplate
      .querySelector(".element")
      .cloneNode(true);
  }

  //публичный метод наполнения карточки контентом
  createCard () {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".element__photo").src = this._linkCard;
    this._element.querySelector(".element__photo").alt = this._nameCard;
    this._element.querySelector(".element__title").textContent = this._nameCard;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector(".element__like").addEventListener("click", this._handleLikeElement); //слушатель кнопки element__like
    this._element.querySelector(".element__remove").addEventListener("click", this._handleDeleteElement); //слушатель кнопки element__remove
    this._element.querySelector(".element__photo").addEventListener("click", this._handlePreviewImage);
  }

//функция снятия/установки like
  _handleLikeElement (event) {
    event.target.classList.toggle("element__like_active");
  };

//функция удаления карточки
  _handleDeleteElement (event) {
    event.target.closest(".element").remove();
  };

  //функция открытия просмотра фото на полный экран
  _handlePreviewImage (event) {
    const _photoElement = document.querySelector(".popup__image");
    const _captionImageElement = document.querySelector(".popup__image-caption");
    const _popupImage = document.querySelector(".popup_type_full-screen");
    _photoElement.src = event.target.closest(".element__photo").src;
    _photoElement.alt = event.target.closest(".element__photo").alt;
    _captionImageElement.textContent = event.target.closest(".element").querySelector(".element__title").textContent;
    _popupImage.classList.add("popup_opened"); //добавляем класс блоку popup со значением display:flex, что делает его видимым на странице
    // document.addEventListener("keydown", () => {
    //   this._closePopupEscClick();
    // }); //добавляем слушатель нажатия кнопок клавиатуры при открытии попап
    // _popupImage.addEventListener("mousedown", () => {
    //   this._closePopupOverlayClick();
    // });
  }
  // _handleOpenPopup () {
  //   this._element.classList.add("popup_opened"); //добавляем класс блоку popup со значением display:flex, что делает его видимым на странице
  //   document.addEventListener("keydown", closePopupEscClick); //добавляем слушатель нажатия кнопок клавиатуры при открытии попап
  //   this._element.addEventListener("mousedown", closePopupOverlayClick); //добавляем слушатель нажатия кнопки мыши при открытии попап
  // }

  // _closePopup () {
  //   Card._popupImage.classList.remove("popup_opened"); //удаляет класс блоку popup со значением display:flex, что делает его невидимым на странице
  //   document.removeEventListener("keydown", closePopupEscClick); //удаляем слушатель нажатия кнопок клавиатуры при закрытии попап
  //   Card._popupImage.removeEventListener("mousedown", closePopupOverlayClick); //удаляем слушатель нажатия кнопки мыши при закрытии попап
  // }
  //
  // _closePopupEscClick (evt) {
  //   if (evt.key === "Escape") { //определяем нажатие escape
  //     this._closePopup(document.querySelector(".popup_opened")); //находим элемент открытого попап и передаем его как аргумент функции закрытия попап
  //   }
  // };

//функция закрытия попап кликом на "оверлей"
//   _closePopupOverlayClick ()
  //   {
  //   if (evt.target.classList.contains("popup_opened")) { //определяем нажатие мыши на оверлай открытого попап
  //     this._closePopup(document.querySelector(".popup_opened")); //находим элемент открытого попап и передаем его как аргумент функции закрытия попап
  //   }
  // }
 //добавляем слушатель нажатия кнопки мыши при открытии попап

    // const photoElement = document.querySelector(".popup__image");
    // const captionImageElement = document.querySelector(".popup__image-caption");
    // photoElement.src = event.target.closest(".element__photo").src;
    // photoElement.alt = event.target.closest(".element__photo").alt;
    // captionImageElement.textContent = event.target.closest(".element").querySelector(".element__title").textContent;
    // openPopup(this._popupImage);
  // };



}