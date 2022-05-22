import {openedPopupSelector, popupCloseBtnSelector} from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  /**
   * приватный метод закрытия попап по esc
   * @param event - событие нажатия кнопки
   * @private
   */
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  /**
   * публичный метод открытия popup c навешиванием обработчика this._handleEscClose
   */
  open() {
    this._popupElement.classList.add(openedPopupSelector);
    document.addEventListener('keyup', this._handleEscClose);
  }

  /**
   * публичный метод закрытия popup c удалением обработчика this._handleEscClose
   */
  close() {
    this._popupElement.classList.remove(openedPopupSelector);
    document.removeEventListener('keyup', this._handleEscClose);
  }

  /**
   * установка слушателей события класса Popup для закрытия по кнопке закрыть или оверлей
   */
  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains(openedPopupSelector) || event.target.classList.contains(popupCloseBtnSelector)) {
        this.close();
      }
    });
  }
}
