import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Checkbox,
  Badge
} from '@material-ui/core';
import { useStyles } from './nav-filter-item.styles';

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
  const styles = useStyles();

  const formGroupOptions = filterList.map((item, idx) => (
    <MenuItem key={item} value={item}>
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
    <div className={styles.container}>
      <Badge
        badgeContent={filterValues.length}
        color='error'
        anchorOrigin={badgePosition}
      >
        <FormControl className={styles.formControl}>
          <InputLabel id='multiple-checkbox-label'>{buttonName}</InputLabel>
          <Select
            labelId='multiple-checkbox-label'
            id='multiple-checkbox'
            multiple
            value={filterValues}
            onChange={filterHandler}
            input={<Input />}
            renderValue={renderFilters}
          >
            {formGroupOptions}
          </Select>
        </FormControl>
      </Badge>
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
