import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import DateRangePicker from '../../filters/date-range-picker';
import { setCurrentPage } from '../../../redux/table/table.actions';

const ComponentFilterDateRangePicker = ({ setFilterValue, filters }) => {
  const dispatch = useDispatch();

  const setDateRangeFilter = (date) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilterValue({
        dateFrom: date[0],
        dateTo: date[1]
      })
    );
  };

  return (
    <DateRangePicker
      dateFrom={filters.dateFrom}
      dateTo={filters.dateTo}
      handler={setDateRangeFilter}
    />
  );
};

ComponentFilterDateRangePicker.propTypes = {
  setFilterValue: PropTypes.func.isRequired,
  filters: PropTypes.objectOf({
    dateFrom: PropTypes.instanceOf(Date),
    dateTo: PropTypes.instanceOf(Date)
  })
};

ComponentFilterDateRangePicker.defaultProps = {
  filters: PropTypes.objectOf({
    dateFrom: '',
    dateTo: ''
  })
};

export default ComponentFilterDateRangePicker;
