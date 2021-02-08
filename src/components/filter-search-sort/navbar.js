import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './navbar.styles';
import NavFilters from './nav-filters';
import NavSort from './nav-sort';
import NavSearch from './nav-search';
import NavClearFilters from './nav-clear-filters';

const Navbar = ({ options }) => {
  const styles = useStyles();
  const { sortOptions, filterOptions, searchOptions, clearOptions } = options;
  return (
    <Grid
      className={styles.container}
      container
      direction='row'
      justify='flex-start'
      alignItems='center'
      spacing={2}
    >
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

Navbar.propTypes = {
  options: PropTypes.objectOf(PropTypes.object).isRequired,
  sortOptions: PropTypes.objectOf(PropTypes.object).isRequired,
  filterOptions: PropTypes.objectOf(PropTypes.object).isRequired,
  searchOptions: PropTypes.objectOf(PropTypes.object).isRequired,
  clearOptions: PropTypes.objectOf(PropTypes.object).isRequired
};
export default Navbar;
