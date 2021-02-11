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
import _ from 'lodash';
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
            data-cy={`user-filters-${buttonName}`}
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
