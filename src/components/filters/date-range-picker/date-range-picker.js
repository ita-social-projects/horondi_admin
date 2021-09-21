import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { DateRangePicker as DateRangeSelector } from 'rsuite';
import { FORMAT_DATE, locale, size } from '../../../consts/date-range-picker';
import { useStyles } from './date-range-picker.styles';
import 'rsuite/dist/styles/rsuite-default.css';

const DateRangePicker = ({ dateFrom, dateTo, handler }) => {
  const styles = useStyles();
  const [value, setValue] = useState([]);

  const { afterToday } = DateRangeSelector;

  useEffect(() => {
    if (dateFrom && dateTo) {
      setValue([dateFrom, dateTo]);
    }
  }, [dateFrom, dateTo]);

  const setDateHandler = (e) => {
    handler(e);
  };

  return (
    <Paper className={styles.container}>
      <DateRangeSelector
        menuClassName={styles.menu}
        className={styles.date}
        format={FORMAT_DATE.UA}
        appearance='subtle'
        isoWeek
        locale={locale}
        size={size.sm}
        value={value}
        disabledDate={afterToday()}
        onChange={setDateHandler}
      />
    </Paper>
  );
};

DateRangePicker.propTypes = {
  dateFrom: PropTypes.instanceOf(Date),
  dateTo: PropTypes.instanceOf(Date),
  handler: PropTypes.func.isRequired
};

DateRangePicker.defaultProps = {
  dateFrom: '',
  dateTo: ''
};

export default DateRangePicker;
