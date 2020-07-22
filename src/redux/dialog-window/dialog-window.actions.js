import {
  SET_DIALOG_STATUS,
  SET_BUTTON_TITLE,
  SET_DIALOG_CONTENT,
  SET_DIALOG_TITLE,
  SET_ON_CLICK_HANDLER
} from './dialog-window.types';

const setDialogStatus = (newDialogStatus) => ({
  type: SET_DIALOG_STATUS,
  payload: newDialogStatus
});

const setDialogTitle = (newDialogTitle) => ({
  type: SET_DIALOG_TITLE,
  payload: newDialogTitle
});

const setDialogContent = (newDialogContent) => ({
  type: SET_DIALOG_CONTENT,
  payload: newDialogContent
});

const setButtonTitle = (newButtonTitle) => ({
  type: SET_BUTTON_TITLE,
  payload: newButtonTitle
});

const setClickHandler = (newOnClickHandler) => ({
  type: SET_ON_CLICK_HANDLER,
  payload: newOnClickHandler
});

export {
  setDialogStatus,
  setDialogTitle,
  setDialogContent,
  setButtonTitle,
  setClickHandler
};
