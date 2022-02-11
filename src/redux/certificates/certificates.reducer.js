import {
  SET_CERTIFICATES_LIST,
  SET_CERTIFICATES_LOADING
} from './certificates.types';

export const initialState = {
  list: { count: 0, items: [] },
  certificatesLoading: false
};

const certificatesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CERTIFICATES_LIST:
      return {
        ...state,
        list: action.payload
      };

    case SET_CERTIFICATES_LOADING:
      return {
        ...state,
        certificatesLoading: action.payload
      };

    default:
      return state;
  }
};

export default certificatesReducer;
