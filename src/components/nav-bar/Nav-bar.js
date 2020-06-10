import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Toolbar, AppBar, Typography, IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import { useStyles } from './Nav-bar-styles';
import { config } from '../../config';

import { setThemeMode, setDrawerStatus } from '../../actions';

const { title } = config.app;

const NavBar = ({ drawerStatus, darkMode, setThemeMode, setDrawerStatus }) => {
  const classes = useStyles();

  const themeChangeHandler = () => setThemeMode(!darkMode);

  const themeButton = darkMode ? <Brightness7Icon /> : <Brightness4Icon />;

  const handleDrawerToggle = () => {
    setDrawerStatus(!drawerStatus);
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
        <IconButton component={Link} to='/login'>
          <AccountCircle id='profileButton' />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const mapsStateToProps = ({ themeState: { darkMode, drawerStatus } }) => ({
  darkMode,
  drawerStatus
});
const mapsDispatchToProps = { setThemeMode, setDrawerStatus };

export default connect(mapsStateToProps, mapsDispatchToProps)(NavBar);
