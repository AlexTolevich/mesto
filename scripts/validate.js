//функция отображения ошибки
const showInputError = (
  inputElement,
  errorElement,
  inputErrorClass,
  errorClass
) => {
  inputElement.classList.add(inputErrorClass); //добавляем класс стилизации поля при ошибке
  errorElement.textContent = inputElement.validationMessage; //добавляем текст ошибки элементу span
  errorElement.classList.add(errorClass); //добавляем класс отображения сообщения об ошибке
};

//функция скрытия ошибки
const hideInputError = (
  inputElement,
  errorElement,
  inputErrorClass,
  errorClass
) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//функция проверки валидности поля
const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //ищем и добавляем в переменную спан с ошибкой по id инпута + окончание id span '-error'

  if (!inputElement.validity.valid) {
    //условие НЕвалидности
    showInputError(inputElement, errorElement, inputErrorClass, errorClass); //есть ошибка вызов функции отображения ошибки
  } else {
    //условие валидности
    hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
  }
};

//функция проверки наличия невалидного инпута в форме
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    //проверка на соответствие хотя бы одного элемента
    return !inputElement.validity.valid; //проверка на НЕвалидность элемента
  });
};

//функция проверки наличия данных в инпуте, пока не работает, т.к. проверка осуществляется только при начале события input
// const hasNotInputValue = (inputList) => {
//   return inputList.every(inputElement => {
//     return inputElement.value.lenght === 0 ;
//   });
// }

//функция отключения кнопки
const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', '');
};

//функция включения кнопки
const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
};

//функция переключения состояния кнопки сабмита
const toggleButtonState = (
  formElement,
  inputList,
  submitButtonSelector,
  inactiveButtonClass
) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);

  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, inactiveButtonClass);
  } else {
    enableSubmitButton(buttonElement, inactiveButtonClass);
  }
};

//функция навешивания обработчиков событий для формы
const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inputErrorClass,
  errorClass,
  inactiveButtonClass
) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(inputSelector)); //ищем и добавляем в переменную все поля ввода
  inputList.forEach((inputElement) => {
    //проходимся по всем инпутам
    inputElement.addEventListener('input', () => {
      //навешиваем на все инпуты обработчик события ввода
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      ); //вызываем функцию проверки валидности инпута
      toggleButtonState(
        formElement,
        inputList,
        submitButtonSelector,
        inactiveButtonClass
      );
    });
  });
  toggleButtonState(
    formElement,
    inputList,
    submitButtonSelector,
    inactiveButtonClass
  );
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector); //ищем и добавляем в переменную все формы из DOM
  formList.forEach((formElement) => {
    setEventListeners(
      formElement,
      config.inputSelector,
      config.submitButtonSelector,
      config.inputErrorClass,
      config.errorClass,
      config.inactiveButtonClass
    );
  });
};
