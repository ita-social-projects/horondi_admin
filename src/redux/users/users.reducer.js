import {
  SET_USERS,
  SET_USER,
  SET_USERS_LOADING,
  SET_USERS_ERROR,
  UPDATE_USER_LOCALLY,
  DELETE_USER_LOCALLY
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
  case UPDATE_USER_LOCALLY:
    return {
      ...state,
      user: { ...state.user, banned: !state.user.banned }
    };
  case DELETE_USER_LOCALLY:
    return {
      ...state,
      list: state.list.filter((item) => item._id !== action.payload)
    };
  default:
    return state;
  }
};

export default usersReducer;
