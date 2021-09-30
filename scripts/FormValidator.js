export default class FormValidator {

  constructor(validationConfig, form) {
    this._config = validationConfig;
    this._formElement = form;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
  }


//приватный метод отображения ошибки
  _showInputError(inputElement) {
    inputElement.classList.add(this._config.inputErrorClass); //добавляем класс стилизации поля при ошибке
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    this._errorElement.textContent = inputElement.validationMessage; //добавляем текст ошибки элементу span
    this._errorElement.classList.add(this._config.errorClass); //добавляем класс отображения сообщения об ошибке
  };

//приватный метод скрытия ошибки
  _hideInputError(inputElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    this._errorElement.classList.remove(this._config.errorClass);
    this._errorElement.textContent = '';
  };

//приватный метод валидности поля
  _checkInputValidity(inputElement) {
    // const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //ищем и добавляем в переменную спан с ошибкой по id инпута + окончание id span '-error'

    if (!inputElement.validity.valid) {
      //условие НЕвалидности
      this._showInputError(inputElement); //есть ошибка вызов функции отображения ошибки
    } else {
      //условие валидности
      this._hideInputError(inputElement);
    }
  };

//приватный метод наличия невалидного инпута в форме
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      //проверка на соответствие хотя бы одного элемента
      return !inputElement.validity.valid; //проверка на НЕвалидность элемента
    });
  };

//приватный метод наличия данных в инпуте, пока не работает, т.к. проверка осуществляется только при начале события input
//   _hasNotInputValue = () => {
//     return this._inputList.every((inputElement) => {
//       return inputElement.value.length === 0;
//     });
//   }

//приватный метод отключения кнопки
  _disableSubmitButton() {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.setAttribute('disabled', '');
  };

//приватный метод включения кнопки
  _enableSubmitButton() {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  };

//приватный метод переключения состояния кнопки сабмита
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  };

//приватный метод навешивания обработчиков событий для формы
  _setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._inputList.forEach((inputElement) => {
      //проходимся по всем инпутам
      inputElement.addEventListener('input', () => {
        //навешиваем на все инпуты обработчик события ввода
        this._checkInputValidity(inputElement); //вызываем функцию проверки валидности инпута
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  };

//публичный метод включающий валидацию
  enableValidation() {
    this._setEventListeners();
  };
}