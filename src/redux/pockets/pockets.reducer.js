import {
  SET_POCKETS,
  SET_POCKETS_LOADING,
  REMOVE_POCKET_FROM_STATE,
  SET_POCKET,
  SET_FILTER,
  CLEAR_FILTER
} from './pockets.types';

export const selectPockets = ({ Pockets }) => ({
  pocketsList: Pockets.list?.items,
  loading: Pockets.pocketsLoading,
  pocket: Pockets.pocket,
  filter: Pockets.filter
});

const initialFilter = {
  search: ''
};

export const initialState = {
  list: [],
  filter: initialFilter,
  pocket: null,
  showPocketsDialogWindow: false,
  pocketsLoading: false,
  pocketsError: null
};

const pocketsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_POCKETS:
      return {
        ...state,
        list: action.payload
      };
    case SET_POCKETS_LOADING:
      return {
        ...state,
        pocketsLoading: action.payload
      };
    case REMOVE_POCKET_FROM_STATE: {
      const list = state.list.items.filter(
        (pocket) => pocket._id !== action.payload
      );
      return {
        ...state,
        list
      };
    }
    case SET_POCKET:
      return {
        ...state,
        pocket: action.payload
      };
    case SET_FILTER:
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
        filter: initialFilter
      };
    default:
      return state;
  }
};

export default pocketsReducer;
