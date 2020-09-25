import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import Routes from '../../routes';
import { theme } from './app-theme/app.theme';
import { useStyles } from './app.styles';
import { config } from '../../configs';
import { checkUserByToken } from '../../redux/auth/auth.actions';
import { getFromLocalStorage } from '../../services/local-storage.service';

const { DARK_THEME, LIGHT_THEME } = config.theme;
const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

const App = () => {
  const darkMode = useSelector(({ Theme }) => Theme.darkMode);
  const themeMode = darkMode ? DARK_THEME : LIGHT_THEME;
  const themeValue = theme(themeMode);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserByToken(token));
  }, [dispatch]);

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
