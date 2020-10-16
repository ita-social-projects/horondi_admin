import { SET_DOUGHNUT_DATA, SET_STATS_LOADING } from './stats.types';

const initialState = {
  loading: false,
  doughnutData: [],
  barData: [],
  date: 7
};

const statsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_STATS_LOADING: {
    return {
      ...state,
      loading: action.payload
    };
  }
  case SET_DOUGHNUT_DATA: {
    return {
      ...state,
      doughnutData: action.payload
    };
  }
  default:
    return state;
  }
};

export default statsReducer;
