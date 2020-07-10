import React from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withWidth
} from '@material-ui/core';

import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { useStyles } from './nav-menu.styles';

import { config } from '../../configs';
import { setDrawerStatus } from '../../redux/theme/theme.actions';

const { menuCategories } = config.app;

const DRAWER_TEMPORARY = 'temporary';
const DRAWER_PERMANENT = 'permanent';
const TEMPORARY_WIDTHS = ['sm', 'xs'];

const NavMenu = ({ width }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const drawerStatus = useSelector(({ Theme }) => Theme.drawerStatus);

  const menuItems = menuCategories.map((category) => {
    const pathTitle = category[0];
    const pathTo = category[1];
    const PathIcon = category[2];

    return (
      <ListItem button key={pathTitle} component={Link} to={pathTo}>
        <ListItemIcon>
          <PathIcon />
        </ListItemIcon>
        <ListItemText primary={pathTitle} />
      </ListItem>
    );
  });

  const handleDrawerToggle = () => {
    dispatch(setDrawerStatus(!drawerStatus));
  };

  const checkWidth = () =>
    TEMPORARY_WIDTHS.find((element) => element === width);

  const drawerVariant = checkWidth() ? DRAWER_TEMPORARY : DRAWER_PERMANENT;

  return (
    <Drawer
      id='menuDrawer'
      className={classes.drawer}
      variant={drawerVariant}
      open={drawerStatus}
      onClose={handleDrawerToggle}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>{menuItems}</List>
      <Divider />
    </Drawer>
  );
};

NavMenu.propTypes = {
  width: PropTypes.string.isRequired
};

export default withWidth()(NavMenu);
