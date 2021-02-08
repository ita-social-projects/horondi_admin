import React from 'react';
import PropTypes from 'prop-types';
import NavFilterItem from '../nav-filter-item';

const NavFilters = ({ filterOptions }) => Object.values(
  filterOptions
).map(
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

NavFilters.propTypes = {
  filterOptions: PropTypes.objectOf(PropTypes.string).isRequired
};

export default NavFilters;
