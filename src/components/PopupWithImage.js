import Popup                                       from './Popup.js';
import {popupImgCaptionSelector, popupImgSelector} from '../utils/constants.js';

/**
 * дочерний класс Popup для открытия popup для просмотра изображения
 */
export default class PopupWithImage extends Popup {
  open(item) {
    this._popupElement.querySelector(popupImgCaptionSelector).textContent = item.name;
    this._imageElement = this._popupElement.querySelector(popupImgSelector);
    this._imageElement.src = item.link;
    this._imageElement.alt = `Изображение ${item.name}`;
    super.open();
  }
}