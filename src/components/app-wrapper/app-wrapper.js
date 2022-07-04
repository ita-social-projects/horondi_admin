import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { ConnectedRouter } from 'connected-react-router';
import App from '../app';
import { history } from '../../store/store';
import { theme } from '../app/app-theme/app.theme';
import { config } from '../../configs';

const { DARK_THEME, LIGHT_THEME } = config.theme;

const AppWrapper = () => {
  const darkMode = useSelector(({ Theme }) => Theme.darkMode);
  const themeMode = darkMode ? DARK_THEME : LIGHT_THEME;
  const themeValue = theme(themeMode);

  return (
    <ThemeProvider theme={themeValue}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ThemeProvider>
  );
};

export default AppWrapper;
