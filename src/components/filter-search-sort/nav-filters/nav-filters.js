import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import NavFilterItem from '../nav-filter-item';

const NavFilters = ({ filterOptions }) => {
  const { filters } = filterOptions;
  const { setStatusFilter } = filterOptions;
  const { categories } = filterOptions;
  const { buttonTitle } = filterOptions;

  const handleFilterChange = ({ target }) => {
    const result = target.value;
    setStatusFilter(result);
  };

  const availableCategories = categories;

  const filterVariants = {
    status: {
      filterLabels: availableCategories,
      filterValues: filters.category,
      filterList: availableCategories,
      filterHandler: (e) => handleFilterChange(e),
      buttonName: buttonTitle
    }
  };

  return _.map(
    Object.values(filterVariants),
    ({ filterList, filterLabels, filterValues, filterHandler, buttonName }) => (
      <NavFilterItem
        filterList={filterList}
        buttonName={buttonName}
        filterValues={filterValues}
        filterHandler={filterHandler}
        filterLabels={filterLabels}
        key={buttonName}
      />
    )
  );
};

NavFilters.propTypes = {
  filterOptions: PropTypes.objectOf(PropTypes.string),
  filters: PropTypes.func,
  categories: PropTypes.func,
  buttonTitle: PropTypes.string,
  setStatusFilter: PropTypes.func
};

export default NavFilters;
