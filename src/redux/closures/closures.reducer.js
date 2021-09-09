import {
  SET_CLOSURES,
  SET_CLOSURES_LOADING,
  REMOVE_CLOSURE_FROM_STATE,
  SET_CLOSURE,
  SET_CLOSURE_FILTER,
  CLEAR_FILTER,
  SET_CLOSURE_ERROR
} from './closures.types';

export const selectClosures = ({ Closures }) => ({
  closuresList: Closures.list?.items,
  loading: Closures.closuresLoading,
  closure: Closures.closure,
  filter: Closures.filter
});

const initialFilter = {
  search: ''
};

export const initialState = {
  list: [],
  filter: initialFilter,
  closure: null,
  showClosuresDialogWindow: false,
  closuresLoading: false,
  closuresError: null
};

const closuresReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CLOSURES:
      return {
        ...state,
        list: action.payload
      };
    case SET_CLOSURES_LOADING:
      return {
        ...state,
        closuresLoading: action.payload
      };
    case REMOVE_CLOSURE_FROM_STATE: {
      const list = state.list.items.filter(
        (closure) => closure._id !== action.payload
      );
      return {
        ...state,
        list
      };
    }
    case SET_CLOSURE:
      return {
        ...state,
        closure: action.payload
      };
    case SET_CLOSURE_FILTER:
      return {
        ...state,
        filter: {
          ...state.filters,
          ...action.payload
        }
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filter: { search: '' }
      };
    case SET_CLOSURE_ERROR:
      return {
        ...state,
        closuresError: action.payload
      };
    default:
      return state;
  }
};

export default closuresReducer;
