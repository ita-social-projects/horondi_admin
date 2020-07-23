import {
  SET_ADMIN,
  SET_ADMIN_ERROR,
  SET_ADMIN_LOADING,
  LOGOUT_ADMIN
} from './admin.types';

const initialState = {
  adminData: null,
  adminError: null,
  adminLoading: false
};

const adminReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_ADMIN:
    return {
      ...state,
      adminError: false,
      adminLoading: false,
      adminData: action.payload
    };

  case SET_ADMIN_ERROR:
    return {
      ...state,
      adminLoading: false,
      adminError: action.payload
    };

  case LOGOUT_ADMIN:
    return {
      ...initialState
    };

  case SET_ADMIN_LOADING:
    return {
      ...state,
      adminLoading: true
    };

  default:
    return state;
  }
};

export default adminReducer;
