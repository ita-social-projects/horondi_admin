import { ADD_POCKET } from './pockets.types';

export const selectSidePockets = ({ SidePockets }) => ({
  sidePocketsList: SidePockets.list?.items,
  loading: SidePockets.sizesLoading,
  sidePocket: SidePockets.size,
  filters: SidePockets.filters
});

const initialFilters = {
  available: [],
  searchBySimpleName: '',
  name: []
};

export const initialState = {
  list: [],
  filters: initialFilters,
  showSidePocketsDialogWindow: false,
  sidePocketsLoading: false,
  sidePocketsError: null
};

const pocketsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_POCKET:
      return {
        ...state
      };

    default:
      return state;
  }
};

export default pocketsReducer;
