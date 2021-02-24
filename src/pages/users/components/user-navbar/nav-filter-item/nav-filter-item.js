import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ListItemText, MenuItem, Checkbox } from '@material-ui/core';
import NavFilterComponent from '../../../../../components/filter-search-sort/nav-filter-component/nav-filter-component';

const badgePosition = {
  vertical: 'top',
  horizontal: 'left'
};

const NavFilterItem = ({
  buttonName,
  filterLabels,
  filterValues,
  filterList,
  filterHandler
}) => {
  const formGroupOptions = filterList.map((item, idx) => (
    <MenuItem data-cy={`user-filters-list-${item}`} key={item} value={item}>
      <Checkbox
        checked={filterValues.findIndex((filter) => filter === item) !== -1}
      />
      <ListItemText primary={filterLabels.length ? filterLabels[idx] : item} />
    </MenuItem>
  ));

  const renderFilters = useMemo(() => (selected) => selected.join(', '), [
    filterList,
    buttonName
  ]);

  return (
    <div>
      <NavFilterComponent
        buttonName={buttonName}
        filterValues={filterValues}
        filterHandler={filterHandler}
        formGroupOptions={formGroupOptions}
        badgePosition={badgePosition}
        renderFilters={renderFilters}
      />
    </div>
  );
};

NavFilterItem.propTypes = {
  buttonName: PropTypes.string.isRequired,
  filterLabels: PropTypes.arrayOf(PropTypes.string),
  filterValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterList: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  filterHandler: PropTypes.func.isRequired
};

NavFilterItem.defaultProps = {
  filterLabels: []
};

export default NavFilterItem;
