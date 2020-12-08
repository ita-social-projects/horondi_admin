import { CLOSE_DIALOG, SHOW_DIALOG } from './dialog-window.types';

export const basicSelector = ({ DialogWindow }) => ({
  isOpen: DialogWindow.isOpen,
  dialogTitle: DialogWindow.dialogTitle,
  dialogContent: DialogWindow.dialogContent,
  buttonTitle: DialogWindow.buttonTitle,
  showCancelButton: DialogWindow.showCancelButton,
  onClickHandler: DialogWindow.onClickHandler
});

export const initialState = {
  isOpen: false,
  dialogTitle: '',
  dialogContent: '',
  buttonTitle: '',
  showCancelButton: true,
  onClickHandler: () => {}
};

const dialogWindowReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SHOW_DIALOG:
    return {
      ...state,
      ...action.payload
    };

  case CLOSE_DIALOG:
    return {
      ...state,
      isOpen: false
    };
  default:
    return state;
  }
};

export default dialogWindowReducer;
