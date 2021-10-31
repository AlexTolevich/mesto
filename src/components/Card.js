import {
  btnLikeSelector,
  btnRemoveCardSelector,
  likeActiveSelector,
  photoCardSelector,
  likesCountSelector,
  photoTitleSelector
} from '../utils/constants.js';

export default class Card {
  constructor({data}, handlePreviewImage, handleDeleteElement, elementTemplate, userId) {
    this._nameCard = data.name;
    this._linkCard = data.link;
    this._likesCount = data.likes;
    this._elementTemplate = elementTemplate;
    this._handlePreviewImage = handlePreviewImage;
    this._handleDeleteElement = handleDeleteElement;
    this._userId = userId;

    this._ownerId = data.owner._id;
  };

  //приватный метод загрузки шаблона document
  _getTemplate() {
    return document.querySelector(this._elementTemplate).content
      .querySelector('.element')
      .cloneNode(true);
  };

  _removeDelBtn() {
    if(this._userId !== this._ownerId) {
      this._element.querySelector(".element__remove").remove();
    }
  }

  //публичный метод наполнения карточки контентом
  createCard() {
    this._element = this._getTemplate();

    this._setEventListeners();
    this._removeDelBtn();
    const photo = this._element.querySelector(photoCardSelector);
    photo.src = this._linkCard;
    photo.alt = this._nameCard;
    this._element.querySelector(photoTitleSelector).textContent = this._nameCard;
    this._element.querySelector(likesCountSelector).textContent = this._likesCount.length;
    console.log(this._userId)
    // console.log(this._ownerId)
    return this._element;
  };




  //приватный метод установки слушателей
  _setEventListeners() {
    this._element.querySelector(btnLikeSelector).addEventListener('click', this._handleLikeElement); //слушатель кнопки element__like
    this._element.querySelector(btnRemoveCardSelector).addEventListener('click', this._handleDeleteElement); //слушатель кнопки element__remove
    this._element.querySelector(photoCardSelector).addEventListener('click', () => this._handlePreviewImage({
      name: this._nameCard,
      link: this._linkCard
    }));
  };

  //приватный метод снятия/установки like
  _handleLikeElement(event) {
    event.target.classList.toggle(likeActiveSelector);
    this._element = null;
  };

  // //приватный метод удаления карточки
  // _handleDeleteElement(event) {
  //   event.target.closest('.element').remove();
  // };
}