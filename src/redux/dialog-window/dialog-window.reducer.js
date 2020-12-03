import { CLOSE_DIALOG, SHOW_DIALOG } from './dialog-window.types';

export const initialState = {
  isOpen: false,
  dialogTitle: '',
  dialogContent: '',
  buttonTitle: '',
  showCancelButton: true
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
