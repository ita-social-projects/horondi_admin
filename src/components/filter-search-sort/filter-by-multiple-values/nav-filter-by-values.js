import React from 'react';
import {
  Badge,
  FormControl,
  Input,
  InputLabel,
  Select
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { useStyles, MenuProps } from './filter-by-multiple-values.styles';
import materialUiConstants from '../../../configs/material-ui-constants';
import { badgePosition } from '../../../configs';
import { useFilter } from '../../../hooks/filter/useFilterSearchAndSort';

const NavFilterByValues = ({
  filterByMultipleOptions: {
    filters,
    setFilterHandler,
    label,
    selectItems,
    objForTranslateRenderItems
  }
}) => {
  const styles = useStyles();

  const { optionHandler, setRenderValue } = useFilter(
    selectItems,
    setFilterHandler
  );

  return (
    <div className={styles.formblock}>
      <Badge
        badgeContent={filters.length}
        color={materialUiConstants.styleError}
        anchorOrigin={badgePosition}
      >
        <FormControl style={{ minWidth: 170 }} className={styles.formControl}>
          <InputLabel id={materialUiConstants.checkBoxLabel}>
            {label}
          </InputLabel>
          <Select
            labelId={materialUiConstants.checkBoxLabel}
            id={materialUiConstants.checkBoxId}
            multiple
            value={filters}
            onChange={optionHandler}
            renderValue={(selected) =>
              setRenderValue(selected, objForTranslateRenderItems)
            }
            input={<Input />}
            autoWidth
            MenuProps={MenuProps}
          >
            {selectItems.map((item) => (
              <MenuItem key={item.key} value={item.key}>
                <Checkbox checked={filters.indexOf(item.key) > -1} />
                <ListItemText primary={item.value} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Badge>
    </div>
  );
};

NavFilterByValues.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string),
  selectItems: PropTypes.arrayOf(PropTypes.string),
  setFilterHandler: PropTypes.func,
  label: PropTypes.string,
  objForTranslateRenderItems: PropTypes.objectOf(PropTypes.object),
  filterByMultipleOptions: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.string,
      PropTypes.func
    ])
  )
};

NavFilterByValues.defaultProps = {
  filterByMultipleOptions: {},
  filters: [],
  selectItems: [],
  setFilterHandler: _.noop,
  label: '',
  objForTranslateRenderItems: {}
};

export default NavFilterByValues;
