import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import PropTypes from 'prop-types';
import _, { noop } from 'lodash';

import { useStyles } from './nav-sort.styles';
import materialUiConstants from '../../../configs/material-ui-constants';
import { sortLabel } from '../../../configs/sort';

import { useSort } from '../../../hooks/filter/useFilterSearchAndSort';

const NavSort = ({ sortOptions }) => {
  const styles = useStyles();
  const { setSorting, sortLabel: sortLabelValue } = sortOptions;

  const selectOptions = _.map(sortOptions.labels, ({ label, value }) => (
    <MenuItem key={label} value={value}>
      {label}
    </MenuItem>
  ));

  const setOptionHandler = useSort(sortOptions.labels, setSorting);

  return (
    <div className={styles.sort}>
      <FormControl className={styles.formControl}>
        <InputLabel id={materialUiConstants.checkBoxLabel}>
          {sortLabel}
        </InputLabel>
        <Select
          data-cy='user-sorting'
          labelId='checkbox-label'
          id='checkbox'
          value={sortLabelValue}
          onChange={setOptionHandler}
          defaultValue={0}
        >
          {selectOptions}
        </Select>
      </FormControl>
    </div>
  );
};

NavSort.propTypes = {
  sortOptions: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.func, PropTypes.string])
  ),
  labels: PropTypes.arrayOf(PropTypes.object),
  setSorting: PropTypes.func
};

NavSort.defaultProps = {
  sortOptions: {},
  labels: [],
  setSorting: noop
};
export default NavSort;
