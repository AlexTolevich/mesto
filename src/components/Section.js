export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /**
   * публичный метод вызова функции-колбэк renderer для каждого элемента (item) из массива
   */
  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }

  /**
   * публичный метод класса Section добавляющий принятый параметр element в контейнер методом prepend
   * @param element - передаваемый параметр (элемент) который необходимо добавить в разметку
   */
  addItem(element) {
    this._container.prepend(element)
  }
}
