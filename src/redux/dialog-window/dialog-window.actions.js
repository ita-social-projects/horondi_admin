import { SHOW_DIALOG, CLOSE_DIALOG } from './dialog-window.types';

const showDialog = (payload) => ({
  type: SHOW_DIALOG,
  payload
});

const closeDialog = () => ({
  type: CLOSE_DIALOG
});

export { showDialog, closeDialog };
