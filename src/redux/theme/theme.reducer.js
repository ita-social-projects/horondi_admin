const initialState = {
  darkMode: true,
  sideMenuStatus: false
};

const themeState = (state = initialState, action = {}) => {
  switch (action.type) {
  case 'SET_THEME_MODE':
    return {
      ...state,
      darkMode: action.payload
    };

  case 'SET_SIDE_MENU_STATUS':
    return {
      ...state,
      sideMenuStatus: action.payload
    };

  default:
    return state;
  }
};

export default themeState;
