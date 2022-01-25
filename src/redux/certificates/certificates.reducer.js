import { SET_CERTIFICATES_LIST } from './certificates.types';

const initialState = {
  list: []
};

const certificatesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CERTIFICATES_LIST:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
};

export default certificatesReducer;
