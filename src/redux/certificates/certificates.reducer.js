import {
  SET_CERTIFICATES_LIST,
  REMOVE_CERTIFICATE_FROM_STORE,
  SET_CERTIFICATES_LOADING,
  CLEAR_FILTERS
} from './certificates.types';

const initialFilters = {
  price: [],
  status: [],
  search: ''
};

const initialState = {
  list: { count: 0, items: [] },
  certificatesLoading: false,
  filters: initialFilters
};

const certificatesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CERTIFICATES_LIST:
      return {
        ...state,
        list: action.payload
      };
    case REMOVE_CERTIFICATE_FROM_STORE:
      const updatedList = state.list.items.filter(
        (item) => item._id !== action.payload
      );

      return {
        ...state,
        list: {
          ...state.list,
          items: updatedList
        }
      };
    case SET_CERTIFICATES_LOADING:
      return {
        ...state,
        certificatesLoading: action.payload
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: initialFilters
      };
    default:
      return state;
  }
};

export default certificatesReducer;
