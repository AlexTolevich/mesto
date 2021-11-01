import {
  btnLikeSelector,
  btnRemoveCardSelector,
  likeActiveSelector,
  photoCardSelector,
  likesCountSelector,
  photoTitleSelector
} from '../utils/constants.js';

export default class Card {
  constructor({data}, handlePreviewImage, handleDeleteElement, handleLikeElement, elementTemplate, userId) {
    this._nameCard = data.name;
    this._linkCard = data.link;
    this._likes = data.likes;
    this._elementTemplate = elementTemplate;
    this._handlePreviewImage = handlePreviewImage;
    this._handleDeleteElement = handleDeleteElement;
    this._handleLikeElement = handleLikeElement;
    this._userId = userId.id;
    this._ownerId = data.owner._id;

  };

  //приватный метод загрузки шаблона document
  _getTemplate() {
    return document.querySelector(this._elementTemplate).content
      .querySelector('.element')
      .cloneNode(true);
  };

  _removeDelBtn() {
    if (this._userId !== this._ownerId) {
      this._element.querySelector('.element__remove').remove();
    }
  }

  counterLikes(likes) {
    this._element.querySelector(likesCountSelector).textContent = likes.length
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
    this._checkLikeUser()
    this.counterLikes(this._likes);
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

  _checkLikeUser() {
    this._likes.forEach((item) => {
      if (this._userId === item._id) {
        this._element.querySelector(btnLikeSelector).classList.add(likeActiveSelector);
      }
    });
  };

  //публичный метод удаления карточки
  deleteElement() {
    this._element.remove();
    this._element = null;
  };
}