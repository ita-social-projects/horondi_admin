const initialState = {
  daysValue: 7
};

const chartsState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DAYS_VALUE':
      return {
        daysValue: action.payload
      };

    default:
      return state;
  }
};

export default chartsState;
