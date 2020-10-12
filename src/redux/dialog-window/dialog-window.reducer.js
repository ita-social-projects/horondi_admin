import { CLOSE_DIALOG, SHOW_DIALOG } from './dialog-window.types';

export const initialState = {
  isOpen: false,
  dialogTitle: '',
  dialogContent: '',
  buttonTitle: '',
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
      ...initialState
    };
  default:
    return state;
  }
};

export default dialogWindowReducer;
