import { ADD_BASICS, GET_BASICS } from './basics.types';

export const selectBasics = ({ Basics }) => ({
  basics: Basics.list?.items,
  loading: Basics.basicsLoading,
  filter: Basics.filter
});

const initialFilter = {
  search: ''
};

export const initialState = {
  list: [],
  filter: initialFilter,
  basics: null,
  basicsLoading: false,
  basicsErrors: null
};

const basicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BASICS:
      return {
        ...state,
        list: action.payload
      };
    case GET_BASICS:
      return {
        ...state
      };
    default:
      return state;
  }
};
