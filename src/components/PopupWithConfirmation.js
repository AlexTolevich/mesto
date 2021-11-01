import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.querySelector('.popup__form').addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleConfirmSubmit();
    });
  }

  submitAction(handleConfirmSubmit) {
    this._handleConfirmSubmit = handleConfirmSubmit;
  }
}