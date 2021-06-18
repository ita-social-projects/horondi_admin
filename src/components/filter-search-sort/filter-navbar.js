import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './filter-navbar.styles';
import NavSort from './nav-sort';
import NavSearch from './nav-search';
import NavClearFilters from './nav-clear-filters';
import NavFilterByDate from './filter-by-date';
import NavFilterByValues from './filter-by-multiple-values';

const FilterNavbar = ({ options }) => {
  const styles = useStyles();
  const {
    sortOptions,
    searchOptions,
    clearOptions,
    filterByDateOptions,
    filterByMultipleOptions
  } = options;

  return (
    <Grid className={styles.container}>
      {filterByDateOptions ? (
        <Grid className={styles.dateRangeItem} item>
          <NavFilterByDate filterByDateOptions={filterByDateOptions} />
        </Grid>
      ) : null}
      {sortOptions ? (
        <Grid className={styles.sortItem} item>
          <NavSort sortOptions={sortOptions} />
        </Grid>
      ) : null}
      {filterByMultipleOptions?.length
        ? filterByMultipleOptions.map((filterItem) => (
            <Grid key={filterItem} className={styles.multipleValues} item>
              <NavFilterByValues filterByMultipleOptions={filterItem} />
            </Grid>
          ))
        : null}
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
  searchOptions: PropTypes.objectOf(PropTypes.object),
  clearOptions: PropTypes.objectOf(PropTypes.object)
};

FilterNavbar.defaultProps = {
  options: {},
  sortOptions: {},
  searchOptions: {},
  clearOptions: {}
};
export default FilterNavbar;
