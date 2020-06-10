const initialState = {
  admin: {}
};

const adminState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ADMIN':
      return {
        ...state,
        admin: action.payload
      };

    default:
      return state;
  }
};

export default adminState;
