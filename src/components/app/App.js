import React from 'react';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import { connect } from 'react-redux';
import { useStyles } from './App-styles';
import AppRouter from '../app-router';

import { theme } from './app-theme/App-theme';

const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

const App = ({ darkMode }) => {
  const themeMode = darkMode ? DARK_THEME : LIGHT_THEME;
  const themeValue = theme(themeMode);

  const classes = useStyles();

  return (
    <ThemeProvider theme={themeValue}>
      <CssBaseline />
      <div className={classes.root}>
        <AppRouter />
      </div>
    </ThemeProvider>
  );
};

const mapsStateToProps = ({ themeState: { darkMode } }) => ({ darkMode });

export default connect(mapsStateToProps)(App);
