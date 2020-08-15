import {
  SET_USERS,
  SET_USER,
  SET_USERS_LOADING,
  SET_USERS_ERROR
} from './users.types';

const initialState = {
  list: [],
  user: null,
  userLoading: false,
  userError: null
};

const usersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_USERS:
    return {
      ...state,
      list: action.payload
    };
  case SET_USER:
    return {
      ...state,
      user: action.payload
    };
  case SET_USERS_LOADING:
    return {
      ...state,
      userLoading: action.payload
    };
  case SET_USERS_ERROR:
    return {
      ...state,
      userError: action.payload
    };
  default:
    return state;
  }
};

export default usersReducer;
