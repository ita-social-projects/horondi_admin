const setThemeMode = (changeTheme) => ({
  type: 'SET_THEME_MODE',
  payload: changeTheme
});

const setDrawerStatus = (newDrawerStatus) => ({
  type: 'SET_DRAWER_STATUS',
  payload: newDrawerStatus
});

export { setThemeMode, setDrawerStatus };
