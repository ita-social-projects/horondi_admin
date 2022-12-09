import { noop } from 'lodash';
import { CLOSE_DIALOG, SHOW_DIALOG } from './dialog-window.types';

export const basicSelector = ({ DialogWindow }) => ({
  isOpen: DialogWindow.isOpen,
  dialogTitle: DialogWindow.dialogTitle,
  dialogContent: DialogWindow.dialogContent,
  onClickHandler: DialogWindow.onClickHandler,
  showCancelButton: DialogWindow.showCancelButton,
  confirmTitle: DialogWindow.confirmTitle
});

export const initialState = {
  isOpen: false,
  dialogTitle: '',
  dialogContent: '',
  showCancelButton: true,
  onClickHandler: noop,
  confirmTitle: false
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
