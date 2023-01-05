import { popupEdit, popupOpenedClass, textareaFormEdit } from "./script.js";

class Messages {
  constructor(data, templateSelector) {
    this._user = data.user;
    this._text = data.text;
    this._image = data.image;
    this._time = null;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    return document
    .querySelector(this._templateSelector)
    .content
    .querySelector('li')
    .cloneNode(true);
  }
  generateMessage() {
    this._message = this._getTemplate();

    let date = new Date();

    this._message.querySelector('.main__text').textContent = this._text;
    this._message.querySelector('.main__img').src = this._image;
    this._message.querySelector('.main__time').textContent = `${
      date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:${
        date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes()} `;

    this._setEventListeners();

    return this._message;
  }
  _setEventListeners() {
    this._deleteButton = this._message.querySelector('.main__trash');

    this._deleteButton.addEventListener('click', () => {
      this._deleteMessage()
    });
  }
  _deleteMessage() {
    this._message.remove();
    this._message = null;
  }


}

export class MyMessages extends Messages {
  constructor(data, templateSelector) {
    super(data, templateSelector);
  }
  _setEventListeners() {
    super._setEventListeners();
    this._editButton = this._message.querySelector('.main__edit');

    this._editButton.addEventListener('click', () => {
      popupEdit.classList.add(popupOpenedClass);
      textareaFormEdit.value = this._text;
    });
  }
  editMessage(newText) {
    this._message.querySelector('.main__text').textContent = newText;
  }
}

export class FriendMessages extends Messages {
  constructor(data, templateSelector) {
    super(data, templateSelector);
    this._image = data.image;
  }
}

export class DateMessage extends Messages {
  constructor(templateSelector) {
    super(templateSelector);
    this._templateSelector = templateSelector;
    this._date = null;
  }
  generateMessage() {
    this._message = super._getTemplate();

    let date = new Date();
    this._message
    .querySelector('.main__date')
    .textContent = `${
      (date.getDay() + 1) > 10 ? date.getDay() + 1 : '0' + (date.getDay() + 1)}.${
        (date.getMonth() + 1) > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}.${
          date.getFullYear()}`;

    return this._message;
  }
}
