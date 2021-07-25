import {
  SET_CLOSURES,
  SET_CLOSURES_LOADING,
  REMOVE_CLOSURE_FROM_STATE,
  SET_CLOSURE
} from './closures.types';

export const selectClosures = ({ Closures }) => ({
  // closuresList: Closures.list?.items,
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
    default:
      return state;
  }
};

export default closuresReducer;
