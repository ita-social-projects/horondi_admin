import {
  SET_POSITIONS,
  SET_POSITIONS_LOADING,
  SET_POSITIONS_FILTER,
  CLEAR_POSITIONS_FILTER,
  REMOVE_POSITION_FROM_STATE,
  SET_POSITION
} from './position.types';

export const selectPositions = ({ Positions }) => ({
  items: Positions.list,
  loading: Positions.positionsLoading,
  position: Positions.position,
  filter: Positions.filter
});

const initialFilter = {
  search: '',
  name: ''
};

export const initialState = {
  list: [],
  filter: initialFilter,
  position: null,
  showPositionsDialogWindow: false,
  positionsLoading: false,
  positionsError: null
};

const positionsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_POSITIONS:
      return {
        ...state,
        list: action.payload
      };
    case SET_POSITIONS_LOADING:
      return {
        ...state,
        positionsLoading: action.payload
      };
    case REMOVE_POSITION_FROM_STATE: {
      const list = state.list.filter(
        (position) => position._id !== action.payload
      );
      return {
        ...state,
        list
      };
    }
    case SET_POSITION:
      return {
        ...state,
        position: action.payload
      };
    case SET_POSITIONS_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload
        }
      };
    case CLEAR_POSITIONS_FILTER:
      return {
        ...state,
        filter: { ...initialFilter }
      };
    default:
      return state;
  }
};

export default positionsReducer;
