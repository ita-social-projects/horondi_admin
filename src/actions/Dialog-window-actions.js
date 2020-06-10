const setDialogStatus = (newDialogStatus) => ({
  type: 'SET_DIALOG_STATUS',
  payload: newDialogStatus
});

const setDialogTitle = (newDialogTitle) => ({
  type: 'SET_DIALOG_TITLE',
  payload: newDialogTitle
});

const setDialogContent = (newDialogContent) => ({
  type: 'SET_DIALOG_CONTENT',
  payload: newDialogContent
});

const setButtonTitle = (newButtonTitle) => ({
  type: 'SET_BUTTON_TITLE',
  payload: newButtonTitle
});

const setEventHandler = (newEventHandler) => ({
  type: 'SET_EVENT_HANDLER',
  payload: newEventHandler
});

export {
  setDialogStatus,
  setDialogTitle,
  setDialogContent,
  setButtonTitle,
  setEventHandler
};
