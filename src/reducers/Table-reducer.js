const initialState = {
  dense: false
};

const tableState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TABLE_DENSE':
      return {
        dense: action.payload
      };

    default:
      return state;
  }
};

export default tableState;
