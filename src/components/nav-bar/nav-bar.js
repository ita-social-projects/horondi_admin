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

import { logoutAdmin } from '../../redux/admin/admin.actions';
import {
  showDialog,
  closeDialog
} from '../../redux/dialog-window/dialog-window.actions';

const { title } = config.app;
const { LOGOUT_TITLE } = config.buttonTitles;
const { LOGOUT_MESSAGE } = config.messages;

const NavBar = () => {
  const classes = useStyles();

  const { darkMode, sideMenuStatus } = useSelector(({ Theme }) => ({
    darkMode: Theme.darkMode,
    sideMenuStatus: Theme.sideMenuStatus
  }));

  const { isAuth } = useSelector(({ Admin }) => ({
    isAuth: Admin.isAuth
  }));

  const dispatch = useDispatch();

  const themeChangeHandler = () => dispatch(setThemeMode(!darkMode));

  const themeButton = darkMode ? <Brightness7Icon /> : <Brightness4Icon />;

  const handleDrawerToggle = () => {
    dispatch(setSideMenuStatus(!sideMenuStatus));
  };

  const openSuccessSnackbar = (onClickHandler) => {
    dispatch(
      showDialog({
        isOpen: true,
        dialogTitle: LOGOUT_TITLE,
        dialogContent: LOGOUT_MESSAGE,
        buttonTitle: LOGOUT_TITLE,
        onClickHandler
      })
    );
  };

  const logoutHandler = () => {
    const logout = () => {
      dispatch(closeDialog());
      dispatch(logoutAdmin());
    };
    openSuccessSnackbar(logout);
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
