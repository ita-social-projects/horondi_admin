const setThemeMode = (changeTheme) => ({
  type: 'SET_THEME_MODE',
  payload: changeTheme
});

const setSideMenuStatus = (newSideMenuStatus) => ({
  type: 'SET_SIDE_MENU_STATUS',
  payload: newSideMenuStatus
});

export { setThemeMode, setSideMenuStatus };
