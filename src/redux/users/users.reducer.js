import {
  SET_USERS,
  SET_USER,
  SET_USERS_LOADING,
  SET_USERS_ERROR,
  UPDATE_USER_LOCALLY,
  DELETE_USER_LOCALLY, SET_TAB, SET_FILTER, SET_SORT
} from './users.types';

const initialState = {
  list: [],
  currentPage: 0,
  usersPerPage: 9,
  sort: {
    name: 1
  },
  filters: {
    roles: ['user'],
    banned: [],
    search: ''
  },
  tab: 0,
  user: null,
  usersCount: null,
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
  case SET_TAB:
    return {
      ...state,
      tab: action.payload
    };
  case SET_FILTER:
    return {
      ...state,
      filters: {
        ...state.filters,
        ...action.payload
      }
    };
  case SET_SORT:
    return {
      ...state,
      sort: {
        ...action.payload
      }
    };
  default:
    return state;
  }
};

export default usersReducer;
