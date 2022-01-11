import React, { useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Drawer,
  Divider,
  List,
  Badge,
  ListItem,
  ListItemIcon,
  ListItemText,
  withWidth,
  Collapse
} from '@material-ui/core';

import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LayersIcon from '@material-ui/icons/Layers';
import TuneIcon from '@material-ui/icons/Tune';

import { useStyles } from './nav-menu.styles';

import { config } from '../../configs';
import { setSideMenuStatus } from '../../redux/theme/theme.actions';
import { resetPagination } from '../../redux/table/table.actions';

import {
  DRAWER_PERMANENT,
  DRAWER_TEMPORARY,
  TEMPORARY_WIDTHS,
  MENU_TABS
} from '../../consts/menu-categories';

const { titles } = config;

const NavMenu = ({ width }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [clientTab, setClientTab] = useState(false);
  const [catalogTab, setCatalogTab] = useState(false);
  const [staticTab, setStaticTab] = useState(false);
  const [constructorTab, setConstructorTab] = useState(false);
  const [certificatesTab, setCertificatesTab] = useState(false);

  const { sideMenuStatus, pendingQuestionsCount } = useSelector(
    ({ Theme, EmailQuestions }) => ({
      sideMenuStatus: Theme.sideMenuStatus,
      pendingQuestionsCount: EmailQuestions.pendingCount
    })
  );

  const returnedList = (pathTitle, pathTo, PathIcon, nested) => (
    <ListItem
      onClick={() => {
        dispatch(setSideMenuStatus(!sideMenuStatus));
        dispatch(resetPagination());
      }}
      button
      key={pathTitle}
      component={NavLink}
      to={pathTo}
      className={pathTitle === 'Слайдер' ? classes.sliderTab : nested || null}
      activeClassName={classes.selectedCategory}
      isActive={(props) => (props ? props.url === pathTo : null)}
    >
      <ListItemIcon>
        <PathIcon />
      </ListItemIcon>
      <ListItemText primary={pathTitle} />
      {pathTitle === titles.emailQuestionsTitles.mainPageTitle && (
        <Badge badgeContent={pendingQuestionsCount} color='error' />
      )}
    </ListItem>
  );

  const menuItems = config.menuCategories.map((category) =>
    returnedList(category[0], category[1], category[2])
  );

  const clientMenuItems = config.clientMenuCategories.map((category) =>
    returnedList(category[0], category[1], category[2], classes.nested)
  );

  const catalogMenuItems = config.catalogMenuCategories.map((category) =>
    returnedList(category[0], category[1], category[2], classes.nested)
  );

  const staticPagesMenuItems = config.staticPagesCategories.map((category) =>
    returnedList(category[0], category[1], category[2], classes.nested)
  );

  const constructorPagesMenuItems = config.constructorMenuCategories.map(
    (category) =>
      returnedList(category[0], category[1], category[2], classes.nested)
  );

  const certificatesMenuItems = config.certificatesMenuCategories.map(
    (category) =>
      returnedList(category[0], category[1], category[2], classes.nested)
  );

  const parentMenuTabsProperties = [
    [
      () => setClientTab(!clientTab),
      clientTab,
      clientMenuItems,
      MENU_TABS.CLIENTS,
      AccessibilityNewIcon
    ],
    [
      () => setCatalogTab(!catalogTab),
      catalogTab,
      catalogMenuItems,
      MENU_TABS.CATALOG,
      ImportContactsIcon
    ],
    [
      () => setConstructorTab(!constructorTab),
      constructorTab,
      certificatesMenuItems,
      MENU_TABS.CERTIFICATES,
      AccessibilityNewIcon
    ],
    [
      () => setCertificatesTab(!certificatesTab),
      certificatesTab,
      constructorPagesMenuItems,
      MENU_TABS.CONSTRUCTOR,
      TuneIcon
    ],
    [
      () => setStaticTab(!staticTab),
      staticTab,
      staticPagesMenuItems,
      MENU_TABS.STATIC_PAGES,
      LayersIcon
    ]
  ];

  const parentMenuItems = parentMenuTabsProperties.map((category) => {
    const handleClick = category[0];
    const stateMenu = category[1];
    const subList = category[2];
    const primary = category[3];
    const ItemIcon = category[4];

    return (
      <Fragment key={category.toString()}>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <ItemIcon />
          </ListItemIcon>
          <ListItemText primary={primary} />
          {stateMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={stateMenu} timeout='auto' unmountOnExit>
          <List>{subList}</List>
        </Collapse>
      </Fragment>
    );
  });

  const handleDrawerToggle = () => {
    dispatch(setSideMenuStatus(!sideMenuStatus));
  };

  const checkWidth = () =>
    TEMPORARY_WIDTHS.find((element) => element === width);
  const drawerVariant = checkWidth() ? DRAWER_TEMPORARY : DRAWER_PERMANENT;

  return (
    <Drawer
      id='menuDrawer'
      className={classes.drawer}
      variant={drawerVariant}
      open={sideMenuStatus}
      onClose={handleDrawerToggle}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {menuItems}
        {parentMenuItems}
      </List>
      <Divider />
    </Drawer>
  );
};

NavMenu.propTypes = {
  width: PropTypes.string.isRequired,
  url: PropTypes.string
};

NavMenu.defaultProps = {
  url: ''
};

export default withWidth()(NavMenu);
