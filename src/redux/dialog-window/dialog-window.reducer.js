const initialState = {
  dialogStatus: false,
  dialogTitle: '',
  dialogContent: '',
  buttonTitle: '',
  onClickHandler: () => {}
};

const dialogWindowReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case 'SET_DIALOG_STATUS':
    return {
      ...state,
      dialogStatus: action.payload
    };

  case 'SET_DIALOG_TITLE':
    return {
      ...state,
      dialogTitle: action.payload
    };

  case 'SET_DIALOG_CONTENT':
    return {
      ...state,
      dialogContent: action.payload
    };

  case 'SET_BUTTON_TITLE':
    return {
      ...state,
      buttonTitle: action.payload
    };

  case 'SET_EVENT_HANDLER':
    return {
      ...state,
      onClickHandler: action.payload
    };
  default:
    return state;
  }
};

export default dialogWindowReducer;
