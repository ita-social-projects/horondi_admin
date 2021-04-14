import React from 'react';
import { Badge, FormControl, Input, InputLabel, Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

import {useStyles} from './filter-by-multiple-values.styles';
import { MenuProps } from '../../../../utils/history';
import materialUiConstants from '../../../../configs/material-ui-constants';
import { badgePosition } from '../../../../configs';

const FilterByMultipleValues = ({
  filters,
  setFilterHandler,
  label,
  selectItems,
  objForTranslateRenderItems,
  renderFilterItems
}) => {

  const styles = useStyles();

  const handleChangeMultiple = ({ target }) => {
    if (target.value) {
      setFilterHandler(target.value);
    }
  };

  return (
    <div>
      <Badge
        badgeContent={filters.length}
        color={materialUiConstants.styleError}
        anchorOrigin={badgePosition}
      >
        <FormControl className={styles.formControl}>
          <InputLabel id={materialUiConstants.checkBoxLabel}>{label}</InputLabel>
          <Select
            labelId={materialUiConstants.checkBoxLabel}
            id={materialUiConstants.checkBoxId}
            multiple
            value={filters}
            onChange={handleChangeMultiple}
            input={<Input/>}
            renderValue={(selected) => renderFilterItems(selected, objForTranslateRenderItems)}
            MenuProps={MenuProps}
          >
            {selectItems.map((item) => {
              return (
                <MenuItem key={item.key} value={item.key}>
                  <Checkbox checked={filters.indexOf(item.key) > -1}/>
                  <ListItemText primary={item.value}/>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Badge>
    </div>
  );
};

export default FilterByMultipleValues;
