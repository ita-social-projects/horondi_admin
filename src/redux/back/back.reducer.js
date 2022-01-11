import {
  SET_BACKS,
  SET_BACK_LOADING,
  SET_BACK,
  SET_BACK_ERROR,
  REMOVE_BACK_FROM_STORE,
  SET_BACK_FILTER,
  CLEAR_FILTERS,
  CLEAR_BACK
} from './back.types';

export const selectBack = ({ Back }) => ({
  items: Back.list,
  loading: Back.backLoading,
  back: Back.back,
  filter: Back.filters,
  sort: Back.sort
});

const initialFilters = {
  name: '',
  model: [],
  available: [],
  material: [],
  color: []
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
    case SET_BACK_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    case CLEAR_BACK:
      return {
        ...state,
        back: null
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          name: '',
          model: [],
          available: [],
          material: [],
          color: []
        }
      };
    default:
      return state;
  }
};

export default backReducer;
