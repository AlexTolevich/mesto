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
    this._id = data._id;
    this._nameCard = data.name;
    this._linkCard = data.link;
    this._likes = data.likes;
    this._elementTemplate = document.querySelector(elementTemplate);
    this._handlePreviewImage = handlePreviewImage;
    this._handleDeleteElement = handleDeleteElement;
    this._handleLikeElement = handleLikeElement;
    this._userId = userId.id;
    this._ownerId = data.owner._id;
  };

  /**
   * приватный метод загрузки шаблона
   */
  _getTemplate() {
    return this._elementTemplate.content
      .querySelector('.element')
      .cloneNode(true);
  };

  /**
   * приватный метод удаления кнопки корзины с карточки созданной другим пользователем
   * @private
   */
  _removeDelBtn() {
    if (this._userId !== this._ownerId) {
      this._removeButton.remove();
    }
  };

  /**
   * публичный метод возвращает булево значение true если в массиве лайков есть лайк текущего пользователя
   * @returns {boolean}
   */
  isLiked() {
    return Boolean(this._likes.find(user => user._id === this._userId))
  };

  /**
   *публичный метод обновляющий массив лайков при успешном запросе добавления или удаления лайка
   * @param likes
   */
  setLikes(likes) {
    this._likes = likes;
    this._handlerLikes();
  };

  /**
   * приватный метод обработки данных лайков устанавливает числовое значение лайков и отображает активность лайка текущего пользователя
   * @private
   */
  _handlerLikes() {
    this._element.querySelector(likesCountSelector).textContent = this._likes.length
    if (this.isLiked()) {
      this._likeButton.classList.add(likeActiveSelector)
    } else {
      this._likeButton.classList.remove(likeActiveSelector)
    }
  };

  /**
   * публичный метод наполнения карточки контентом
   * @returns {null|*}
   */
  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(btnLikeSelector);
    this._removeButton = this._element.querySelector(btnRemoveCardSelector)
    this._cardImage = this._element.querySelector(photoCardSelector);
    this._cardImage.src = this._linkCard;
    this._cardImage.alt = this._nameCard;
    this._element.querySelector(photoTitleSelector).textContent = this._nameCard;
    this._removeDelBtn();
    this._handlerLikes();
    this._setEventListeners();
    return this._element;
  };

  /**
   * публичный метод удаления карточки
   */
  deleteElement() {
    this._element.remove();
    this._element = null;
  };

  /**
   * публичный метод получения id карточки
   * @returns {*}
   */
  getId() {
    return this._id
  };

  /**
   * приватный метод установки слушателей
   * @private
   */
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeElement(this)); //слушатель кнопки element__like
    this._removeButton.addEventListener('click', () => this._handleDeleteElement(this)); //слушатель кнопки element__remove
    this._cardImage.addEventListener('click', () => this._handlePreviewImage({
      name: this._nameCard,
      link: this._linkCard
    }));
  };
}