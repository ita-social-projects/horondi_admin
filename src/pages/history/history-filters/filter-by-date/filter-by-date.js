import React from 'react';
import TextField from '@material-ui/core/TextField';

import { generateDateFormatForInputValue } from '../../../../utils/history';
import materialUiConstants from '../../../../configs/material-ui-constants';
import { useStyles } from './filter-by-date.styles';

const FilterByDate = ({ filters, setDateRangeFilter, title }) => {

  const styles = useStyles();

  const setDateHandler = ({ target }) => {
    if (target.value) {
      setDateRangeFilter(new Date(target.value).getTime());
    }
  };

  return (
    <form className={styles.container} noValidate>
      <TextField
        id={materialUiConstants.types.datetimeLocal}
        onBlur={setDateHandler}
        label={title}
        defaultValue={filters ? generateDateFormatForInputValue(filters) : ''}
        type={materialUiConstants.types.datetimeLocal}
        className={styles.textField}
        InputLabelProps={{
          shrink: true
        }}
      />
    </form>
  );
};

export default FilterByDate;
