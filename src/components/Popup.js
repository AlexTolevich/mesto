import {openedPopupSelector, popupCloseBtnSelector} from '../utils/constants.js';
import {validationConfig}                           from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this); //почитать про потерю контекста еще раз!!!
    this._submitButton = this._popupElement.querySelector(validationConfig.submitButtonSelector);
  }

  /**
   * приватный метод закрытия попап по esc
   * @param event - событие нажатия кнопки
   * @private
   */
  _handleEscClose(event) {
    if (event.key === 'Escape') {  //определяем нажатие escape
      this.close();  //вызываем публичный метод закрытия popup
    }
  }

  /**
   * публичный метод открытия popup c навешиванием обработчика this._handleEscClose
   */
  open() {
    this._popupElement.classList.add(openedPopupSelector); //добавляем класс блоку popup со значением display:flex, что делает его видимым на странице
    document.addEventListener('keyup', this._handleEscClose); //добавляем слушатель нажатия кнопок клавиатуры при открытии попап
  }

  /**
   * публичный метод закрытия popup c удалением обработчика this._handleEscClose
   */
  close() {
    this._popupElement.classList.remove(openedPopupSelector); //удаляет класс блоку popup со значением display:flex, что делает его невидимым на странице
    document.removeEventListener('keyup', this._handleEscClose); //удаляем слушатель нажатия кнопок клавиатуры при закрытии попап
  }

  /**
   * установка слушателей события класса Popup для закрытия по кнопке закрыть или оверлей
   */
  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains(openedPopupSelector) || event.target.classList.contains(popupCloseBtnSelector)) {  //определяем есть-ли в объекте события класс popup_opened или popup__close-button
        this.close(); //вызываем публичный метод закрытия popup
      }
    });
  }

  /**
   * публичный метод улучшающий UX в части отображения процесса обмена данными с сервером
   * @param isLoading
   */
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = 'Сохранить';
    }
  }
}
