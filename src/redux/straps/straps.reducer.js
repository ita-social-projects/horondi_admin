import {
  SET_STRAPS,
  SET_STRAPS_LOADING,
  REMOVE_STRAP_FROM_STATE,
  SET_STRAP,
  SET_STRAPS_FILTER,
  CLEAR_STRAPS_FILTER,
  SET_STRAPS_ERROR
} from './straps.types';

export const selectStraps = ({ Straps }) => ({
  strapsList: Straps.list?.items,
  loading: Straps.strapsLoading,
  strap: Straps.strap,
  filter: Straps.filter
});

const initialFilter = {
  search: ''
};

export const initialState = {
  list: [],
  filter: initialFilter,
  strap: null,
  showStrapsDialogWindow: false,
  strapsLoading: false,
  strapsError: null
};

const strapsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STRAPS:
      return {
        ...state,
        list: action.payload
      };
    case SET_STRAPS_LOADING:
      return {
        ...state,
        strapsLoading: action.payload
      };
    case REMOVE_STRAP_FROM_STATE: {
      const list = state.list.items.filter(
        (strap) => strap._id !== action.payload
      );
      return {
        ...state,
        list
      };
    }
    case SET_STRAP:
      return {
        ...state,
        strap: action.payload
      };
    case SET_STRAPS_FILTER:
      return {
        ...state,
        filter: {
          ...state.filters,
          ...action.payload
        }
      };
    case CLEAR_STRAPS_FILTER:
      return {
        ...state,
        filter: { search: '' }
      };
    case SET_STRAPS_ERROR:
      return {
        ...state,
        strapsErrorError: action.payload
      };
    default:
      return state;
  }
};

export default strapsReducer;
