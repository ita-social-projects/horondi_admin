import {
  SET_HISTORY_ERROR,
  SET_HISTORY_LOADING,
  SET_HISTORY_RECORDS
} from './history.types';

export const initialState = {
  records: null,
  historyLoading: false,
  historyError: null
};

const historyReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_HISTORY_RECORDS:
      return {
        ...state,
        records: action.payload
      };
    case SET_HISTORY_LOADING:
      return {
        ...state,
        historyLoading: action.payload
      };
    case SET_HISTORY_ERROR:
      return {
        ...state,
        historyError: action.payload
      };

    default:
      return state;
  }
};

export default historyReducer;
