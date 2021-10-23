import Popup                                       from './Popup.js';
import {popupImgCaptionSelector, popupImgSelector} from '../utils/constants.js';

/**
 * дочерний класс Popup для открытия popup для просмотра изображения
 */
export default class PopupWithImage extends Popup {
  open(link, name) {
    this._popupElement.querySelector(popupImgCaptionSelector).textContent = name;
    const imageElement = this._popupElement.querySelector(popupImgSelector);
    imageElement.src = link;
    imageElement.alt = `Изображение ${name}`;
    super.open();
  }
}