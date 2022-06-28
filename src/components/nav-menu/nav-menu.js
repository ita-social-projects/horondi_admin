import React, { useState, Fragment, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
const allCategories = [
  ...config.menuCategories,
  ...config.materialMenuCategories,
  ...config.clientMenuCategories,
  ...config.catalogMenuCategories,
  ...config.promoMenuCategories,
  ...config.staticPagesCategories,
  ...config.constructorMenuCategories,
  ...config.certificatesMenuCategories
];

const NavMenu = ({ width }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const routeLocation = useLocation();

  const initialDocumentTitle = config.menuCategories[0][0];

  const staticArray = {
    clientTab: false,
    catalogTab: false,
    certificatesTab: false,
    constructorTab: false,
    staticTab: false,
    materialsTab: false,
    promoTab: false
  };

  const [navbarTab, setNavbarTab] = useState({ ...staticArray });

  const { sideMenuStatus, pendingQuestionsCount } = useSelector(
    ({ Theme, EmailQuestions }) => ({
      sideMenuStatus: Theme.sideMenuStatus,
      pendingQuestionsCount: EmailQuestions.pendingCount
    })
  );

  const setDocumentTitle = (newTitle) => {
    document.title = `Horondi - ${newTitle}`;
  };

  useEffect(() => {
    const currentTab = allCategories.find(
      (category) => category[1] === routeLocation.pathname
    );
    setDocumentTitle(
      currentTab && currentTab[0] ? currentTab[0] : initialDocumentTitle
    );
  }, [routeLocation, initialDocumentTitle]);

  const returnedList = (pathTitle, pathTo, PathIcon, nested) => (
    <ListItem
      onClick={() => {
        dispatch(setSideMenuStatus(!sideMenuStatus));
        dispatch(resetPagination());
        if (nested === classes.notNested) {
          setNavbarTab({
            ...staticArray
          });
        }
      }}
      button
      key={pathTitle}
      component={NavLink}
      to={pathTo}
      disableGutters
      className={pathTitle === 'Слайдер' ? classes.sliderTab : nested || null}
      activeClassName={classes.selectedCategory}
      isActive={(props) => (props ? props.url === pathTo : null)}
    >
      <ListItemIcon>
        <PathIcon />
      </ListItemIcon>
      <ListItemText primary={pathTitle} />
      {pathTitle === titles.emailQuestionsTitles.mainPageTitle && (
        <Badge
          badgeContent={pendingQuestionsCount}
          className={classes.bageRight}
          color='error'
        />
      )}
    </ListItem>
  );

  const makeMenuItems = (arrayOfCategories, className) =>
    config[arrayOfCategories].map(([pathTitle, pathTo, PathIcon]) =>
      returnedList(pathTitle, pathTo, PathIcon, classes[className])
    );

  const menuItems = makeMenuItems('menuCategories', 'notNested');
  const promoMenuItems = makeMenuItems('promoMenuCategories', 'nested');
  const materialMenuItems = makeMenuItems('materialMenuCategories', 'nested');
  const clientMenuItems = makeMenuItems('clientMenuCategories', 'nested');
  const catalogMenuItems = makeMenuItems('catalogMenuCategories', 'nested');
  const staticPagesMenuItems = makeMenuItems('staticPagesCategories', 'nested');
  const constructorPagesMenuItems = makeMenuItems(
    'constructorMenuCategories',
    'nested'
  );
  const certificatesMenuItems = makeMenuItems(
    'certificatesMenuCategories',
    'nested'
  );

  const createParentMenuTab = (tabName, itemsInMenu, TAB, icon) => [
    () =>
      setNavbarTab({
        ...staticArray,
        [tabName]: !navbarTab[tabName]
      }),
    navbarTab[tabName],
    itemsInMenu,
    MENU_TABS[TAB],
    icon
  ];

  const parentMenuTabsProperties = [
    createParentMenuTab(
      'clientTab',
      clientMenuItems,
      'CLIENTS',
      AccessibilityNewIcon
    ),
    createParentMenuTab(
      'catalogTab',
      catalogMenuItems,
      'CATALOG',
      ImportContactsIcon
    ),
    createParentMenuTab(
      'certificatesTab',
      certificatesMenuItems,
      'CERTIFICATES',
      TuneIcon
    ),
    createParentMenuTab('promoTab', promoMenuItems, 'PROMOCODE', PromoIcon),
    createParentMenuTab(
      'constructorTab',
      constructorPagesMenuItems,
      'CONSTRUCTOR',
      AccessibilityNewIcon
    ),
    createParentMenuTab(
      'materialsTab',
      materialMenuItems,
      'MATERIALS',
      ExtensionIcon
    ),
    createParentMenuTab(
      'staticTab',
      staticPagesMenuItems,
      'STATIC_PAGES',
      LayersIcon
    )
  ];

  const parentMenuItems = parentMenuTabsProperties.map(
    ([handleClick, stateMenu, subList, primary, ItemIcon]) => (
      <Fragment key={primary}>
        <ListItem
          button
          onClick={handleClick}
          disableGutters
          className={classes.notNested}
        >
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
    )
  );

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
