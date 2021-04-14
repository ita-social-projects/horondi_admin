import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import _ from 'lodash';

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

FilterByDate.propTypes = {
  filters: PropTypes.string,
  setDateRangeFilter: PropTypes.func,
  title: PropTypes.string
};

FilterByDate.defaultProps = {
  filters: '',
  setDateRangeFilter: _.noop,
  title: ''
};

export default FilterByDate;
