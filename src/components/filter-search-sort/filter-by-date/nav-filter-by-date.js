import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { DateRangePicker } from 'rsuite';
import { FORMAT_DATE, locale, size } from '../../../consts/date-range-picker';
import { useStyles } from './filter-by-date.styles';
import 'rsuite/dist/styles/rsuite-default.css';

const NavFilterByDate = ({
  filterByDateOptions: { dateFrom, dateTo, dateHandler }
}) => {
  const styles = useStyles();
  const { afterToday } = DateRangePicker;

  const [value, setValue] = useState([]);

  const setDateHandler = (e) => {
    dateHandler(e);
  };

  useEffect(() => {
    if (dateFrom && dateTo) {
      setValue([dateFrom, dateTo]);
    }
  }, [dateFrom, dateTo]);

  return (
    <Paper className={styles.root}>
      <DateRangePicker
        menuClassName={styles.menuPicker}
        className={styles.datePicker}
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

NavFilterByDate.propTypes = {
  // dateFrom: PropTypes.string,
  dateTo: PropTypes.string,
  filterByDateOptions: PropTypes.objectOf(PropTypes.object)
};
NavFilterByDate.defaultProps = {
  // dateFrom: '',
  dateTo: '',
  filterByDateOptions: {}
};

export default NavFilterByDate;
