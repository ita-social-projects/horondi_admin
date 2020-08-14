import { SET_USERS } from './users.types';

const initialState = {
  list: []
};

const usersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_USERS:
    return {
      ...state,
      list: action.payload
    };
  default:
    return state;
  }
};

export default usersReducer;
