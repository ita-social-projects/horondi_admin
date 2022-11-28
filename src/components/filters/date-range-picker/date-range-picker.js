import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { DateRangePicker as DateRangeSelector } from 'rsuite';
import { FORMAT_DATE, locale, size } from '../../../consts/date-range-picker';
import { useStyles } from './date-range-picker.styles';
import 'rsuite/dist/styles/rsuite-default.css';
import { useFilterByData } from '../../../hooks/filter/useFilterSearchAndSort';

const DateRangePicker = ({ dateFrom, dateTo, handler }) => {
  const styles = useStyles();
  const { dataHandler, value } = useFilterByData(dateFrom, dateTo, handler);
  const { afterToday } = DateRangeSelector;

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
        onChange={dataHandler}
        showOneCalendar
      />
    </Paper>
  );
};

DateRangePicker.propTypes = {
  dateFrom: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  dateTo: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  handler: PropTypes.func.isRequired
};

DateRangePicker.defaultProps = {
  dateFrom: null,
  dateTo: null
};

export default DateRangePicker;
