import { SET_NEWS } from './news.types';

const initialState = {
  list: []
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        list: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default newsReducer;
