import { SET_SIDE_MENU_STATUS, SET_THEME_MODE } from './theme.types';
import { getFromLocalStorage } from '../../services/local-storage.service';

const darkModeStatus = getFromLocalStorage('darkMode');

const initialState = {
  darkMode: darkModeStatus,
  sideMenuStatus: false
};

const themeState = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_THEME_MODE:
    return {
      ...state,
      darkMode: action.payload
    };

  case SET_SIDE_MENU_STATUS:
    return {
      ...state,
      sideMenuStatus: action.payload
    };

  default:
    return state;
  }
};

export default themeState;
