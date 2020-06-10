import React from 'react';

import { MenuItem, FormControlLabel, Checkbox } from '@material-ui/core';
import { connect } from 'react-redux';

import {
  setFilterSelected,
  setCheckBoxStatus,
  setFilterCounters
} from '../../actions';

import useStyles from './Table-nav-filter-menuitem-style';

const TableNavFilterMenuItem = ({
  name,
  filter,
  groupOption,
  filterSelected,
  filterCounters,
  checkboxStatus,
  setFilterSelected,
  setCheckBoxStatus,
  setFilterCounters
}) => {
  const classes = useStyles();

  const addFilter = (name, filter) => ({
    ...filterSelected,
    [name]: [...filterSelected[name], filter]
  });

  const removeFilter = (name, filter) => {
    const filters = filterSelected[name].filter((option) => option !== filter);
    return {
      ...filterSelected,
      [name]: filters
    };
  };

  const increaseCount = (name) => ({
    ...filterCounters,
    [name]: filterCounters[name] + 1,
    total: filterCounters.total + 1
  });

  const decreaseCount = (name) => ({
    ...filterCounters,
    [name]: filterCounters[name] - 1,
    total: filterCounters.total - 1
  });

  const handleChange = (name, filter) => (event) => {
    const { checked } = event.target;
    setCheckBoxStatus({ ...checkboxStatus, [filter]: checked });
    if (checked) {
      setFilterSelected(addFilter(name, filter));
      setFilterCounters(increaseCount(name));
    } else {
      setFilterSelected(removeFilter(name, filter));
      setFilterCounters(decreaseCount(name));
    }
  };

  const checkBox = (
    <Checkbox
      size='small'
      checked={checkboxStatus[filter]}
      onChange={handleChange(name, filter)}
    />
  );

  return (
    <MenuItem key={filter}>
      <FormControlLabel
        className={classes.checkbox}
        control={checkBox}
        label={groupOption[name]}
      />
    </MenuItem>
  );
};

const setMapStateToProps = ({
  filtersState: { filterSelected, checkboxStatus, filterCounters }
}) => ({
  filterSelected,
  checkboxStatus,
  filterCounters
});

const setDispatchToProps = {
  setFilterSelected,
  setCheckBoxStatus,
  setFilterCounters
};

export default connect(
  setMapStateToProps,
  setDispatchToProps
)(TableNavFilterMenuItem);
