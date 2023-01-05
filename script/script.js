import { startMessages } from "./constants.js";
import { toggleStateClearButton } from "./validate.js";
import { MyMessages, FriendMessages, DateMessage } from "./messages.js";

const buttonAddMyMessage = document.querySelector('.header__button_add_my');
const buttonAddFriendMessage = document.querySelector('.header__button_add_friend');
export const buttonClearChat = document.querySelector('.header__button_clear');

export const popupOpenedClass = 'popup_opened';

export const chatList = document.querySelector('.main__list');

const popupI = document.querySelector('.popup_i');
export const popupEdit = document.querySelector('.popup_edit');
const popupFriend = document.querySelector('.popup_friend');
const popupClear = document.querySelector('.popup_clear');

const listPopupCloseIcons = Array.from(document.querySelectorAll('.popup__close-icon'));

const formClear = document.forms.clear_form;
const formI = document.forms.i_form;
const formEdit = document.forms.edit_form;
const formFriend = document.forms.friend_form;

const textareaFormI = formI.querySelector('.popup__textarea');
const textareaFormFriend = formFriend.querySelector('.popup__textarea');
export const textareaFormEdit = formEdit.querySelector('.popup__textarea');


const closePopup = (popup) => {
  popup.classList.remove(popupOpenedClass);
};

const renderCurrentDate = () => {
  const messageCurrentDate = new DateMessage('#template_date');
  chatList.append(messageCurrentDate.generateMessage());
};

const renderMessage = (data) => {
  const newMessage = data.user === 'i' ?
  new MyMessages(data, '#template_my-message') :
  new FriendMessages(data, '#template_friend-message');

  chatList.prepend(newMessage.generateMessage());
  toggleStateClearButton();
};

renderCurrentDate();

startMessages.forEach((message) => {
  renderMessage(message);
});


listPopupCloseIcons.forEach((closeIcon) => {
  closeIcon.addEventListener('click', (evt) => {
    const currentPopup = closeIcon.closest('.popup');
    closePopup(currentPopup);
  });
});

function handleClearFormSubmit(evt) {
  evt.preventDefault();
  chatList.innerHTML = '';
  closePopup(popupClear);
  toggleStateClearButton();
  renderCurrentDate();
}

function handleIFormSubmit(evt) {
  evt.preventDefault();
  renderMessage({user: 'i', text: textareaFormI.value, image: "./images/1.png"});
  formI.reset();
  closePopup(popupI);
}

function handleFriendFormSubmit(evt) {
  evt.preventDefault();
  renderMessage({user: 'friend', text: textareaFormFriend.value, image: "./images/2.png"});
  formFriend.reset();
  closePopup(popupFriend);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
/////// - тут находим текст в сообщении и подменяем его на тот, что в текстареа

  formEdit.reset();
  closePopup(popupEdit);
}

formClear.addEventListener('submit', handleClearFormSubmit);
formI.addEventListener('submit', handleIFormSubmit);
formFriend.addEventListener('submit', handleFriendFormSubmit);
formEdit.addEventListener('submit', handleEditFormSubmit);

buttonAddMyMessage.addEventListener('click', () => {
  popupI.classList.add(popupOpenedClass);
});

buttonAddFriendMessage.addEventListener('click', () => {
  popupFriend.classList.add(popupOpenedClass);
});

buttonClearChat.addEventListener('click', () => {
  popupClear.classList.add(popupOpenedClass);
});
