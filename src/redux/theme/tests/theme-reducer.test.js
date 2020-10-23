import { setSideMenuStatus, setThemeMode } from '../theme.actions';
import themeState, { initialState } from '../theme.reducer';
import { darkMode, sideMenuStatus } from './theme.variables';

describe('theme reducer tests', () => {
  it('return initial state', () => {
    expect(themeState(initialState)).toEqual(initialState);
  });
  it('should set dark mode to true', () => {
    expect(themeState(initialState, setThemeMode(true))).toEqual({
      ...initialState,
      darkMode
    });
  });
  it('should set side menu status to true', () => {
    expect(themeState(initialState, setSideMenuStatus(true))).toEqual({
      ...initialState,
      sideMenuStatus
    });
  });
});
