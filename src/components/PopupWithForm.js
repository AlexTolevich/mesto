import Popup                                                     from './Popup.js';
import {popupFormSelector, popupInputSelector, validationConfig} from '../utils/constants.js';

/**
 * дочерний класс Popup с формами
 */
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupFormElement = this._popupElement.querySelector(popupFormSelector);
    this._submitButton = this._popupElement.querySelector(validationConfig.submitButtonSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  /**
   * перегрузка публичного метода close с очисткой формы
   */
  close() {
    super.close();
    this._popupFormElement.reset();
  }

  /**
   * приватный метод загрузки данных полей в объект
   * @returns {{formValues}}
   * @private
   */
  _getInputValues() {
    const formValues = {}; //создали пустой массив
    this._inputList = Array.from(this._popupFormElement.querySelectorAll(popupInputSelector)); //создаем массив полей ввода формы
    this._inputList.forEach((inputElement) => {
      formValues[inputElement.name] = inputElement.value
    }); //проходим по всем инпутам и добавляем данные в массив formValues
    return formValues; //возвращаем из метода _getInputValues() заполненный массив с данными из полей формы
  }

  /**
   * установка слушателей события сабмит класса Popup
   */
  setEventListeners() {
    this._popupFormElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  /**
   * публичный метод улучшающий UX в части отображения процесса обмена данными с сервером
   * @param isLoading логическое значение процесса загрузки
   * @param title подпись при
   * @param loadingTitle
   */
     renderLoading(isLoading = false, title = 'Сохранить', loadingTitle = 'Сохранение...') {
    if (!isLoading) {
      this._submitButton.textContent = title;
    } else {
      this._submitButton.textContent = loadingTitle;
    }
  }
}