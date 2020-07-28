import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Toolbar, AppBar, Typography, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import { useStyles } from './nav-bar.styles';

import { config } from '../../configs';

import {
  setThemeMode,
  setSideMenuStatus
} from '../../redux/theme/theme.actions';

import { logoutUser } from '../../redux/auth/auth.actions';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';

import useSuccessSnackbar from '../../utils/use-success-snackbar';

const { title } = config.app;
const { LOGOUT_TITLE } = config.buttonTitles;
const { LOGOUT_MESSAGE } = config.messages;

const NavBar = () => {
  const classes = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const { darkMode, sideMenuStatus } = useSelector(({ Theme }) => ({
    darkMode: Theme.darkMode,
    sideMenuStatus: Theme.sideMenuStatus
  }));

  const { isAuth } = useSelector(({ Auth }) => ({
    isAuth: Auth.isAuth
  }));

  const dispatch = useDispatch();

  const themeChangeHandler = () => dispatch(setThemeMode(!darkMode));

  const themeButton = darkMode ? <Brightness7Icon /> : <Brightness4Icon />;

  const handleDrawerToggle = () => {
    dispatch(setSideMenuStatus(!sideMenuStatus));
  };

  const logoutHandler = () => {
    const logout = () => {
      dispatch(closeDialog());
      dispatch(logoutUser());
    };
    openSuccessSnackbar(logout, LOGOUT_TITLE, LOGOUT_MESSAGE, LOGOUT_TITLE);
  };

  const menuToggle = (
    <IconButton
      id='menuToggle'
      onClick={handleDrawerToggle}
      className={classes.menuButton}
    >
      <MenuIcon />
    </IconButton>
  );

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        {menuToggle}
        <Typography id='logo' variant='h4' className={classes.title}>
          {title}
        </Typography>
        <IconButton id='themeToggler' onClick={themeChangeHandler}>
          {themeButton}
        </IconButton>
        {isAuth && (
          <IconButton onClick={logoutHandler}>
            <ExitToAppIcon id='logoutButton' />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
