import { CLOSE_DIALOG, SHOW_DIALOG } from './dialog-window.types';

const initialState = {
  dialogStatus: false,
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
      ...state,
      dialogStatus: false
    };
  default:
    return state;
  }
};

export default dialogWindowReducer;
