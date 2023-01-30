const themeHolder = {
  isDarkTheme: false
};

export function passThemeStatus(isDarkTheme) {
  themeHolder.isDarkTheme = isDarkTheme;
}

export function getThemeStatus() {
  return themeHolder.isDarkTheme;
}
