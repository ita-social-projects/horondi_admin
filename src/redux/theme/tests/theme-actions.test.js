import { SET_SIDE_MENU_STATUS, SET_THEME_MODE } from '../theme.types';
import { setSideMenuStatus, setThemeMode } from '../theme.actions';
import { darkMode, sideMenuStatus } from './theme.variables';

describe('theme actions tests', () => {
  it('should set theme mode', () => {
    expect(setThemeMode(darkMode)).toEqual({
      type: SET_THEME_MODE,
      payload: darkMode
    });
  });
  it('should set side menu mode', () => {
    expect(setSideMenuStatus(sideMenuStatus)).toEqual({
      type: SET_SIDE_MENU_STATUS,
      payload: sideMenuStatus
    });
  });
});
