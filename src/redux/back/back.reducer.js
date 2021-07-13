import {
  SET_BACKS,
  SET_BACK_LOADING,
  SET_BACK,
  SET_BACK_ERROR,
  REMOVE_BACK_FROM_STORE,
  SET_FILTER,
  SET_SORT,
  CLEAR_FILTERS
} from './back.types';

export const selectBack = ({ Back }) => ({
  list: Back.list,
  loading: Back.backLoading,
  back: Back.back,
  filter: Back.filters,
  sort: Back.sort
});

const initialFilters = {
  name: '',
  // description: '',
  model: [],
  available: [],
  material: []
  // handmade: []
};

export const initialState = {
  list: [],
  sort: {
    name: 1
  },
  filters: initialFilters,
  back: null,
  backLoading: false,
  backError: null
};

const backReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_BACKS:
      return {
        ...state,
        list: action.payload
      };
    case SET_BACK:
      return {
        ...state,
        back: action.payload
      };
    case SET_BACK_LOADING:
      return {
        ...state,
        backLoading: action.payload
      };
    case SET_BACK_ERROR:
      return {
        ...state,
        backError: action.payload
      };
    case REMOVE_BACK_FROM_STORE:
      const backs = state.list.filter((back) => back._id !== action.payload);
      return {
        ...state,
        list: backs
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
        filters: initialFilters
      };
    default:
      return state;
  }
};

export default backReducer;
