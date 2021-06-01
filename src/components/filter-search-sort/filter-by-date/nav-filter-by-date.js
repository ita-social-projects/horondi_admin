import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DateRangePicker } from 'rsuite';
import { FORMAT_DATE, locale, size } from '../../../consts/date-range-picker';
import 'rsuite/dist/styles/rsuite-default.css';
import { useStyles } from './filter-by-date.styles';

const NavFilterByDate = ({
  filterByDateOptions: { dateFrom, dateTo, dateHandler }
}) => {
  const styles = useStyles();
  const { afterToday } = DateRangePicker;

  const from = dateFrom || new Date();
  const to = dateTo || new Date();

  const [value, setValue] = useState([from, to]);
  const setDateHandler = (e) => {
    setValue(e);
    dateHandler(e);
  };
  return (
    <form className={styles.container} noValidate>
      <DateRangePicker
        format={FORMAT_DATE.UA}
        isoWeek
        locale={locale}
        size={size.md}
        value={value}
        disabledDate={afterToday()}
        onChange={setDateHandler}
      />
    </form>
  );
};

NavFilterByDate.propTypes = {
  dateFrom: PropTypes.string,
  dateTo: PropTypes.string,
  filterByDateOptions: PropTypes.objectOf(PropTypes.object)
};
NavFilterByDate.defaultProps = {
  dateFrom: '',
  dateTo: '',
  filterByDateOptions: {}
};

export default NavFilterByDate;
