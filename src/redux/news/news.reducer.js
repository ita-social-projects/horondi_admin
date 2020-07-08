import { SET_NEWS, SHOW_LOADER, HIDE_LOADER } from './news.types';

const initialState = {
  list: [],
  loading: false
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        list: action.payload
      };
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default newsReducer;
