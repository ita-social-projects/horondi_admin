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

import { connect } from 'react-redux';
import { useStyles } from './Nav-menu-styles';

import { config } from '../../config';
import { setDrawerStatus } from '../../actions';

const { menuCategories } = config.app;

const DRAWER_TEMPORARY = 'temporary';
const DRAWER_PERMANENT = 'permanent';
const TEMPORARY_WIDTHS = ['sm', 'xs'];

const NavMenu = ({ width, drawerStatus, setDrawerStatus }) => {
  const classes = useStyles();

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
    setDrawerStatus(!drawerStatus);
  };

  const checkWidth = (width) =>
    TEMPORARY_WIDTHS.find((element) => element === width);

  const drawerVariant = checkWidth(width) ? DRAWER_TEMPORARY : DRAWER_PERMANENT;

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

const mapStateToProps = ({ themeState: { drawerStatus } }) => ({
  drawerStatus
});
const mapDispatchToProps = { setDrawerStatus };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(NavMenu));
