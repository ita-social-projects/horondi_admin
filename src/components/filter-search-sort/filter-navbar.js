import React from 'react';
import {Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import {useStyles} from './filter-navbar.styles';
import NavFilters from './nav-filters';
import NavSort from './nav-sort';
import NavSearch from './nav-search';
import NavClearFilters from './nav-clear-filters';
import NavFilterByDate from "./filter-by-date";
import NavFilterByValues from "./filter-by-miltiple-values";

const FilterNavbar = ({options}) => {
    const styles = useStyles();
    const {
        sortOptions,
        filterOptions,
        searchOptions,
        clearOptions,
        filterByDateOptions,
        filterByMultipleOptions
    } = options;

    return (
        <Grid className={styles.container}>
            {filterByDateOptions ? (
                <Grid item>
                    <NavFilterByDate filterByDateOptions={filterByDateOptions}/>
                </Grid>
            ) : null}
            {sortOptions ? (
                <Grid item>
                    <NavSort sortOptions={sortOptions}/>
                </Grid>
            ) : null}
            {filterByMultipleOptions ? (
                <Grid item>
                    <NavFilterByValues filterByMultipleOptions={filterByMultipleOptions}/>
                </Grid>
            ) : null}
            {filterOptions ? (
                <Grid item>
                    <NavFilters filterOptions={filterOptions}/>
                </Grid>
            ) : null}
            {searchOptions ? (
                <Grid item>
                    <NavSearch searchOptions={searchOptions}/>
                </Grid>
            ) : null}
            {clearOptions ? (
                <Grid item>
                    <NavClearFilters clearOptions={clearOptions}/>
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
