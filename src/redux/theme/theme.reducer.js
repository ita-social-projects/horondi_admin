const initialState = {
  darkMode: true,
  drawerStatus: false
};

const themeState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_THEME_MODE':
      return {
        ...state,
        darkMode: action.payload
      };

    case 'SET_DRAWER_STATUS':
      return {
        ...state,
        drawerStatus: action.payload
      };

    default:
      return state;
  }
};

export default themeState;
