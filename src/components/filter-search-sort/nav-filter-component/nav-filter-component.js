import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  Input,
  Badge
} from '@material-ui/core';
import { useStyles } from './nav-filter-component.styles';

const NavFilterComponent = ({
  buttonName,
  filterValues,
  filterHandler,
  formGroupOptions,
  badgePosition,
  renderFilters
}) => {
  const styles = useStyles();
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

NavFilterComponent.propTypes = {
  buttonName: PropTypes.string.isRequired,
  filterValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterHandler: PropTypes.func.isRequired,
  formGroupOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  badgePosition: PropTypes.objectOf(PropTypes.string).isRequired,
  renderFilters: PropTypes.func.isRequired
};
export default NavFilterComponent;
