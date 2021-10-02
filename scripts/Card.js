export default class Card {

  constructor(data, elementTemplate, handlePreviewImage) {
    this._nameCard = data.name;
    this._linkCard = data.link;
    this._elementTemplate = elementTemplate;
    this._handlePreviewImage = handlePreviewImage;
  };

  //приватный метод загрузки шаблона document
  _getTemplate() {
    return document.querySelector(this._elementTemplate).content
      .querySelector('.element')
      .cloneNode(true);
  };

  //публичный метод наполнения карточки контентом
  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const photo = this._element.querySelector('.element__photo');
    photo.src = this._linkCard;
    photo.alt = this._nameCard;
    this._element.querySelector('.element__title').textContent = this._nameCard;
    return this._element;
  };

  //приватный метод установки слушателей
  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', this._handleLikeElement); //слушатель кнопки element__like
    this._element.querySelector('.element__remove').addEventListener('click', this._handleDeleteElement); //слушатель кнопки element__remove
    this._element.querySelector('.element__photo').addEventListener('click', () => this._handlePreviewImage(this._nameCard, this._linkCard));
  };

  //приватный метод снятия/установки like
  _handleLikeElement(event) {
    event.target.classList.toggle('element__like_active');
    this._element = null;
  };

  //приватный метод удаления карточки
  _handleDeleteElement(event) {
    event.target.closest('.element').remove();
  };
}