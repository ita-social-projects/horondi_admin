import {
  SET_AUTH,
  SET_AUTH_ERROR,
  SET_AUTH_LOADING,
  SET_ADMIN_ID,
  LOGOUT_USER
} from './auth.types';

export const initialState = {
  isAuth: null,
  adminId: null,
  error: null,
  loading: false
};

const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.payload
      };

    case SET_ADMIN_ID:
      return {
        ...state,
        adminId: action.payload
      };

    case SET_AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case LOGOUT_USER:
      return {
        isAuth: false,
        adminId: null,
        error: null,
        loading: false
      };

    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    default:
      return state;
  }
};

export default authReducer;
