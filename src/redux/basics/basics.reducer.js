import {
  SET_BASICS,
  REMOVE_BASIC,
  SET_BASICS_LOADING,
  SET_BASIC,
  CLEAR_BASICS_FILTER,
  SET_BASICS_FILTER
} from './basics.types';

export const selectBasics = ({ Basics }) => ({
  items: Basics.list,
  loading: Basics.basicsLoading,
  filter: Basics.filter,
  basic: Basics.basic
});

const initialFilter = {
  name: '',
  available: [],
  material: [],
  color: []
};

export const initialState = {
  list: [],
  filter: initialFilter,
  basics: null,
  basicsLoading: false,
  basicsErrors: null
};

const basicsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_BASICS:
      return {
        ...state,
        list: action.payload
      };
    case REMOVE_BASIC:
      const list = state.list.filter((basic) => basic._id !== action.payload);
      return {
        ...state,
        list
      };
    case SET_BASICS_LOADING:
      return {
        ...state,
        basicsLoading: action.payload
      };
    case SET_BASIC:
      return {
        ...state,
        basic: action.payload
      };
    case SET_BASICS_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload
        }
      };
    case CLEAR_BASICS_FILTER:
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

export default basicsReducer;
