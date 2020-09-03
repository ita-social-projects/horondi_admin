import { SHOW_DIALOG, CLOSE_DIALOG } from './dialog-window.types';

const showDialog = (dialogOptions) => ({
  type: SHOW_DIALOG,
  payload: dialogOptions
});

const closeDialog = () => ({
  type: CLOSE_DIALOG
});

export { showDialog, closeDialog };
