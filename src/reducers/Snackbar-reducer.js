const initialState = {
  snackBarStatus: false,
  snackBarSeverity: '',
  snackBarMessage: ''
};

const snackbarState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SNACKBAR_SEVERITY':
      return {
        ...state,
        snackBarSeverity: action.payload
      };
    case 'SET_SNACKBAR_MESSAGE':
      return {
        ...state,
        snackBarMessage: action.payload
      };
    case 'SET_SNACKBAR_STATUS':
      return {
        ...state,
        snackBarStatus: action.payload
      };

    default:
      return state;
  }
};

export default snackbarState;
