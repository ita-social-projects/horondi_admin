import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import DateRangePicker from '../../filters/date-range-picker';

const ComponentFilterDateRangePicker = ({
  actionSetCurrentPage,
  actionSetFilter,
  filters
}) => {
  const dispatch = useDispatch();

  const setDateRangeFilter = (date) => {
    dispatch(actionSetCurrentPage(0));
    dispatch(
      actionSetFilter({
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
  actionSetCurrentPage: PropTypes.func.isRequired,
  actionSetFilter: PropTypes.func.isRequired,
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
