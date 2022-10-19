import {
  SET_POCKETS,
  SET_POCKETS_LOADING,
  REMOVE_POCKET_FROM_STATE,
  SET_POCKET,
  SET_POCKETS_FILTER,
  CLEAR_POCKETS_FILTER
} from './pockets.types';

export const selectPockets = ({ Pockets }) => ({
  items: Pockets.list,
  loading: Pockets.pocketsLoading,
  pocket: Pockets.pocket,
  filter: Pockets.filter
});

const initialFilter = {
  search: '',
  name: ''
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
      const list = state.list.filter((pocket) => pocket._id !== action.payload);
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
    case SET_POCKETS_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload
        }
      };
    case CLEAR_POCKETS_FILTER:
      return {
        ...state,
        filter: { ...initialFilter }
      };
    default:
      return state;
  }
};

export default pocketsReducer;
