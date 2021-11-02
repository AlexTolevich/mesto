import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.querySelector('.popup__form').addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleConfirmSubmit();
    });
  }

  /**
   * публичный метод сабмита подтверждения действия
   * @param handleConfirmSubmit
   */
  submitAction(handleConfirmSubmit) {
    this._handleConfirmSubmit = handleConfirmSubmit;
  }
}