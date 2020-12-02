import { CLOSE_DIALOG, SHOW_DIALOG } from './dialog-window.types';

// export const basicDispatchSelector = ({ DialogWindow }) => ({
//   onClickHandler: () => {}
// });

export const basicSelector = ({ DialogWindow }) => ({
  isOpen: DialogWindow.isOpen,
  dialogTitle: DialogWindow.dialogTitle,
  dialogContent: DialogWindow.dialogContent,
  buttonTitle: DialogWindow.buttonTitle,
  showIcon: DialogWindow.showIcon,
  showCancelButton: DialogWindow.showCancelButton
});

export const initialState = {
  isOpen: false,
  dialogTitle: '',
  dialogContent: '',
  buttonTitle: '',
  showIcon: true,
  showCancelButton: true
  // onClickHandler: () => {}
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
