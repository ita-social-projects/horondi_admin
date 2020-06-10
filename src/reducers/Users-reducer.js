const initialState = {
  users: [],
  user: {},
  loading: true
};

const usersState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case 'LOADING_STATUS':
      return {
        ...state,
        loading: true
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default usersState;
