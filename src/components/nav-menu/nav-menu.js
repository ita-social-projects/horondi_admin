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
import ExtensionIcon from '@material-ui/icons/Extension';

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
import { PromoIcon } from '../nav-bar/icons';

const { titles } = config;

const NavMenu = ({ width }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [navbarTab, setNavbarTab] = useState({
    clientTab: false,
    catalogTab: false,
    certificatesTab: false,
    constructorTab: false,
    staticTab: false,
    materialsTab: false,
    promoTab: false
  });

  const staticArray = {
    clientTab: false,
    catalogTab: false,
    certificatesTab: false,
    constructorTab: false,
    staticTab: false,
    materialsTab: false,
    promoTab: false
  };

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
        setNavbarTab({
          ...staticArray
        });
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

  const materialMenuItems = config.materialMenuCategories.map((category) =>
    returnedList(...category, classes.nested)
  );

  const clientMenuItems = config.clientMenuCategories.map((category) =>
    returnedList(category[0], category[1], category[2], classes.nested)
  );

  const catalogMenuItems = config.catalogMenuCategories.map((category) =>
    returnedList(category[0], category[1], category[2], classes.nested)
  );

  const promoMenuItems = config.promoMenuCategories.map((category) =>
    returnedList(...category, classes.nested)
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
      () =>
        setNavbarTab({
          ...staticArray,
          clientTab: !navbarTab.clientTab
        }),
      navbarTab.clientTab,
      clientMenuItems,
      MENU_TABS.CLIENTS,
      AccessibilityNewIcon
    ],
    [
      () =>
        setNavbarTab({
          ...staticArray,
          catalogTab: !navbarTab.catalogTab
        }),
      navbarTab.catalogTab,
      catalogMenuItems,
      MENU_TABS.CATALOG,
      ImportContactsIcon
    ],
    [
      () =>
        setNavbarTab({
          ...staticArray,
          certificatesTab: !navbarTab.certificatesTab
        }),
      navbarTab.certificatesTab,
      certificatesMenuItems,
      MENU_TABS.CERTIFICATES,
      TuneIcon
    ],
    [
      () =>
        setNavbarTab({
          ...staticArray,
          promoTab: !navbarTab.promoTab
        }),
      navbarTab.promoTab,
      promoMenuItems,
      MENU_TABS.PROMOCODE,
      PromoIcon
    ],
    [
      () =>
        setNavbarTab({
          ...staticArray,
          constructorTab: !navbarTab.constructorTab
        }),
      navbarTab.constructorTab,
      constructorPagesMenuItems,
      MENU_TABS.CONSTRUCTOR,
      AccessibilityNewIcon
    ],
    [
      () =>
        setNavbarTab({
          ...staticArray,
          materialsTab: !navbarTab.materialsTab
        }),
      navbarTab.materialsTab,
      materialMenuItems,
      MENU_TABS.MATERIALS,
      ExtensionIcon
    ],
    [
      () =>
        setNavbarTab({
          ...staticArray,
          staticTab: !navbarTab.staticTab
        }),
      navbarTab.staticTab,
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
