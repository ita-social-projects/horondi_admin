import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ListItemText, MenuItem, Checkbox } from '@material-ui/core';
import _ from 'lodash';
import NavFilterComponent from '../nav-filter-component/nav-filter-component';

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
  const formGroupOptions = useMemo(
    () =>
      _.map(filterList, (item, idx) => (
        <MenuItem
          data-cy={`user-filters-list-${item}`}
          key={item._id}
          value={item._id}
        >
          <Checkbox
            checked={
              _.findIndex(filterValues, (filter) => filter === item._id) !== -1
            }
          />
          <ListItemText
            primary={
              filterLabels.length
                ? filterLabels[idx].name[0].value
                : item.name[0].value
            }
          />
        </MenuItem>
      )),
    [filterList]
  );

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
  filterLabels: PropTypes.arrayOf(PropTypes.object),
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
