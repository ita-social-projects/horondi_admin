import { HIDE_LOADER, SHOW_LOADER } from './app.types';

const initialState = {
  loading: true
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default appReducer;
