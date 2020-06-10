const initialState = {
  colors: []
};

const colorsState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COLORS':
      return {
        colors: action.payload
      };

    default:
      return state;
  }
};

export default colorsState;
