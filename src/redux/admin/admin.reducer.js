import {
  SET_AUTH,
  SET_ADMIN_ERROR,
  SET_ADMIN_LOADING,
  LOGOUT_ADMIN
} from './admin.types';

const initialState = {
  isAuth: false,
  adminError: null,
  adminLoading: false
};

const adminReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_AUTH:
    return {
      ...state,
      isAuth: action.payload
    };

  case SET_ADMIN_ERROR:
    return {
      ...state,
      adminError: action.payload
    };

  case LOGOUT_ADMIN:
    return {
      isAuth: false,
      adminError: null,
      adminLoading: false
    };

  case SET_ADMIN_LOADING:
    return {
      ...state,
      adminLoading: action.payload
    };

  default:
    return state;
  }
};

export default adminReducer;
