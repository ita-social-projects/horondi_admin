import {
  SET_BOTTOMS,
  SET_BOTTOM,
  SET_BOTTOM_LOADING,
  SET_BOTTOM_ERROR,
  REMOVE_BOTTOM_FROM_STORE,
  SET_BOTTOM_FILTER,
  CLEAR_BOTTOM,
  CLEAR_FILTERS
} from './bottom.types';

export const selectBottom = ({ Bottom }) => ({
  list: Bottom.list,
  loading: Bottom.bottomLoading,
  bottom: Bottom.bottom,
  filter: Bottom.filters,
  sort: Bottom.sort
});

const initialFilters = {
  name: ''
};

export const initialState = {
  list: [],
  sort: {
    name: 1
  },
  filters: initialFilters,
  bottom: null,
  bottomLoading: false,
  bottomError: null
};

const bottomReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_BOTTOMS:
      return {
        ...state,
        list: action.payload
      };
    case SET_BOTTOM:
      return {
        ...state,
        bottom: action.payload
      };
    case SET_BOTTOM_LOADING:
      return {
        ...state,
        bottomLoading: action.payload
      };
    case SET_BOTTOM_ERROR:
      return {
        ...state,
        bottomError: action.payload
      };
    case REMOVE_BOTTOM_FROM_STORE:
      const bottoms = state.list.filter(
        (bottom) => bottom._id !== action.payload
      );
      return {
        ...state,
        list: bottoms
      };
    case SET_BOTTOM_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    case CLEAR_BOTTOM:
      return {
        ...state,
        bottom: null
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          name: ''
        }
      };
    default:
      return state;
  }
};

export default bottomReducer;
