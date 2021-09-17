import {
  SET_USERS,
  SET_USER,
  SET_USERS_LOADING,
  SET_USERS_ERROR,
  DELETE_USER_LOCALLY,
  SET_TAB,
  SET_TAB_ORDERS_COMMENTS,
  SET_FILTER,
  SET_SORT,
  CLEAR_FILTERS,
  SET_ADMIN_CREATION_LOADING,
  NEW_ADMIN_REGISTERED,
  USER_SORT_LABEL
} from './users.types';

const initialFilters = {
  roles: ['user'],
  banned: [],
  search: ''
};

export const initialState = {
  list: [],
  sort: {},
  filters: initialFilters,
  tab: 0,
  tabOrdersComments: 0,
  user: null,
  userLoading: false,
  userError: null,
  isNewAdminCreated: false,
  adminLoading: false,
  sortLabel: ''
};

const usersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        list: action.payload
      };
    case USER_SORT_LABEL:
      return {
        ...state,
        sortLabel: action.payload
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
    case SET_ADMIN_CREATION_LOADING:
      return {
        ...state,
        adminLoading: action.payload
      };
    case NEW_ADMIN_REGISTERED:
      return {
        ...state,
        isNewAdminCreated: action.payload
      };
    case SET_USERS_ERROR:
      return {
        ...state,
        userError: action.payload
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
    case SET_TAB_ORDERS_COMMENTS:
      return {
        ...state,
        tabOrdersComments: action.payload
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
    case CLEAR_FILTERS:
      return {
        ...state,
        sort: {},
        sortLabel: '',
        filters: {
          ...state.filters,
          banned: initialFilters.banned,
          search: initialFilters.search
        }
      };
    default:
      return state;
  }
};

export default usersReducer;
