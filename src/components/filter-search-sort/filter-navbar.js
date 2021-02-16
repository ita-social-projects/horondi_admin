import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './filter-navbar.styles';
import NavFilters from './nav-filters';
import NavSort from './nav-sort';
import NavSearch from './nav-search';
import NavClearFilters from './nav-clear-filters';

const FilterNavbar = ({ options }) => {
  const styles = useStyles();
  const { sortOptions, filterOptions, searchOptions, clearOptions } = options;
  return (
    <Grid className={styles.container}>
      {sortOptions ? (
        <Grid item>
          <NavSort sortOptions={sortOptions} />
        </Grid>
      ) : null}
      {filterOptions ? (
        <Grid item>
          <NavFilters filterOptions={filterOptions} />
        </Grid>
      ) : null}
      {searchOptions ? (
        <Grid item>
          <NavSearch searchOptions={searchOptions} />
        </Grid>
      ) : null}
      {clearOptions ? (
        <Grid item>
          <NavClearFilters clearOptions={clearOptions} />
        </Grid>
      ) : null}
    </Grid>
  );
};

FilterNavbar.propTypes = {
  options: PropTypes.objectOf(PropTypes.object),
  sortOptions: PropTypes.objectOf(PropTypes.object),
  filterOptions: PropTypes.objectOf(PropTypes.object),
  searchOptions: PropTypes.objectOf(PropTypes.object),
  clearOptions: PropTypes.objectOf(PropTypes.object)
};

FilterNavbar.defaultProps = {
  options: {},
  sortOptions: {},
  filterOptions: {},
  searchOptions: {},
  clearOptions: {}
};
export default FilterNavbar;
