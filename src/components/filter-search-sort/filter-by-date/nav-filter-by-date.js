import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

const NavFilterByDate = ({
  filterByDateOptions: { dateFrom, dateTo, dateHandler }
}) => {
  const { afterToday } = DateRangePicker;
  const from = dateFrom || new Date();
  const to = dateTo || new Date();

  const [value, setValue] = useState([from, to]);
  const setDateHandler = (value) => {
    setValue(value);
    dateHandler(value);
  };
  return (
    <DateRangePicker
      format='DD-MM-YYYY'
      isoWeek
      style={{ width: 280 }}
      value={value}
      disabledDate={afterToday()}
      onChange={setDateHandler}
    />
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
