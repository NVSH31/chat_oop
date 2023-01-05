import { buttonClearChat, chatList } from "./script.js";

export const toggleStateClearButton = () => {
  if (chatList.children.length !== 0) {
    buttonClearChat.disabled = false;
    buttonClearChat.classList.remove('header__button_clear_inactive');
  } else {
    buttonClearChat.disabled = true;
    buttonClearChat.classList.add('header__button_clear_inactive');
  }
};
