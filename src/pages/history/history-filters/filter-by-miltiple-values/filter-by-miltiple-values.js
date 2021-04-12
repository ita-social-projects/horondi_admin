import React, { useState } from 'react';
import { FormControl, Input, InputLabel, Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
const FilterByMultipleValues = ({
  setFilterHandler,
  label,
  selectItems,
  objForTranslateRenderItems,
  renderFilterItems
}) => {
  const classes = useStyles();

  const [filterItem, setFilterItem] = useState([]);

  const handleChange = (event) => {
    setFilterItem(event.target.value);

  };
  const handleClose = () => {
    setFilterHandler(filterItem);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={filterItem}
          onChange={handleChange}
          onClose={handleClose}
          input={<Input/>}
          renderValue={(selected) => renderFilterItems(selected, objForTranslateRenderItems)}
          MenuProps={MenuProps}
        >
          {selectItems.map((item) => {
            return (
              <MenuItem key={item.key} value={item.key}>
                <Checkbox checked={filterItem.indexOf(item.key) > -1}/>
                <ListItemText primary={item.value}/>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterByMultipleValues;
