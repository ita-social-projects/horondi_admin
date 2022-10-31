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

export const selectBack = ({ Backs }) => ({
  items: Backs.list,
  loading: Backs.backLoading,
  back: Backs.back,
  filter: Backs.filter,
  sort: Backs.sort
});

const initialFilter = {
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
  filter: initialFilter,
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
        filter: {
          ...state.filter,
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
        filter: {
          ...initialFilter
        }
      };
    default:
      return state;
  }
};

export default backReducer;
