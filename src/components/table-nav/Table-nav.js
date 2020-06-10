import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormControlLabel, Switch, Grid } from '@material-ui/core';
import wrapWithAdminService from '../wrappers';

import {
  setFilterOptionsGroups,
  setFilterSelected,
  setFilterOptionsList,
  setProductsFilters,
  setCheckBoxStatus,
  setFilterCounters,
  setSearchTerm,
  setTableDense
} from '../../actions';

import useStyles from './Table-nav-style';
import TableNavButtons from '../table-nav-buttons';
import TableNavFilterMenu from '../table-nav-filter-menu';
import TableNavSearchBar from '../table-nav-searchbar';

import { config } from '../../config';
import { StandardButton } from '../buttons';

const { filterLabels, filterCounters } = config.productFilters;
const { pathToAddProduct } = config.app.routes;

const NEW_PRODUCT_BUTTON_TITLE = 'NEW PRODUCT';
const filterMenuStatus = {
  catalog: null,
  category: null,
  brand: null
};

const SMALL_SIZE = 'small';
const DEFAULT_SIZE = 'medium';
const SEATCH_CLEAR = '';

const TableNav = ({
  adminService,
  filterSelected,
  filterOptionsList,
  setCheckBoxStatus,
  checkboxLoaded,
  setFilterSelected,
  setFilterOptionsList,
  setProductsFilters,
  setFilterOptionsGroups,
  setFilterCounters,
  setSearchTerm,
  setTableDense,
  dense
}) => {
  const [menuStatus, setMenuStatus] = React.useState(filterMenuStatus);

  const classes = useStyles();
  const size = dense ? SMALL_SIZE : DEFAULT_SIZE;

  const { productPropetriesService } = adminService;

  const setCheckBoxes = useCallback(() => {
    productPropetriesService
      .getProductOptions()
      .then((res) => setCheckBoxStatus(res.filterOptionsList));
  }, [setCheckBoxStatus, productPropetriesService]);

  useEffect(() => {
    if (!checkboxLoaded) {
      setCheckBoxes();
    }
  }, [setCheckBoxes, checkboxLoaded]);

  useEffect(() => {
    productPropetriesService.getProductOptions().then((res) => {
      setFilterOptionsList(res.filterOptionsList);
      setFilterOptionsGroups(res.filterOptions);
    });
  }, [productPropetriesService, setFilterOptionsList, setFilterOptionsGroups]);

  const filterInitialState = () => {
    setCheckBoxStatus(filterOptionsList);
    setFilterSelected(filterLabels);
    setProductsFilters(filterLabels);
    setFilterCounters(filterCounters);
    setSearchTerm(SEATCH_CLEAR);
  };

  const handleChangeTableDense = (event) => {
    setTableDense(event.target.checked);
  };

  const handleMenuOpen = (name) => (event) => {
    const target = event.currentTarget;
    setMenuStatus({ ...menuStatus, [name]: target });
  };

  const handleMenuClose = (name) => () => {
    setMenuStatus({ ...menuStatus, [name]: null });
    setProductsFilters(filterSelected);
  };

  const handleClearFilter = () => {
    filterInitialState();
  };

  return (
    <Grid
      id='tableNav'
      className={classes.tableNav}
      container
      spacing={2}
      justify='center'
      alignItems='center'
    >
      <Grid item md={2}>
        <StandardButton
          component={Link}
          to={pathToAddProduct}
          size={size}
          title={NEW_PRODUCT_BUTTON_TITLE}
        />
      </Grid>
      <Grid item md={2}>
        <FormControlLabel
          control={
            <Switch
              checked={dense}
              onChange={handleChangeTableDense}
              size={SMALL_SIZE}
            />
          }
          label='Compact'
        />
      </Grid>
      <Grid item md={6}>
        <TableNavButtons
          handleMenuOpen={handleMenuOpen}
          handleClearFilter={handleClearFilter}
        />
        <TableNavFilterMenu
          handleMenuClose={handleMenuClose}
          menuStatus={menuStatus}
        />
      </Grid>
      <Grid item md={2}>
        <TableNavSearchBar />
      </Grid>
    </Grid>
  );
};

const setMapStateToProps = ({
  filtersState: {
    filterSelected,
    filterOptionsList,
    checkboxStatus,
    checkboxLoaded
  },
  tableState: { dense }
}) => ({
  filterSelected,
  filterOptionsList,
  checkboxStatus,
  checkboxLoaded,
  dense
});
const setDispatchToProps = {
  setFilterOptionsGroups,
  setFilterSelected,
  setProductsFilters,
  setFilterOptionsList,
  setCheckBoxStatus,
  setFilterCounters,
  setSearchTerm,
  setTableDense
};

export default wrapWithAdminService()(
  connect(setMapStateToProps, setDispatchToProps)(TableNav)
);
