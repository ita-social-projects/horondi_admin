import {
  SET_CERTIFICATES_LIST,
  REMOVE_CERTIFICATE_FROM_STORE
} from './certificates.types';

const initialState = {
  list: { count: 0, items: [] }
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
    default:
      return state;
  }
};

export default certificatesReducer;
