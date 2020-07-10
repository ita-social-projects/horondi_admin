import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import Routes from '../../routes';
import { theme } from './app-theme/app.theme';
import { useStyles } from './App.styles';
import { config } from '../../configs';

const { DARK_THEME, LIGHT_THEME } = config.app.theme;

const App = () => {
  const darkMode = useSelector(({ Theme }) => Theme.darkMode);
  const themeMode = darkMode ? DARK_THEME : LIGHT_THEME;
  const themeValue = theme(themeMode);

  const classes = useStyles();

  return (
    <ThemeProvider theme={themeValue}>
      <CssBaseline>
        <div className={classes.root}>
          <Routes />
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
