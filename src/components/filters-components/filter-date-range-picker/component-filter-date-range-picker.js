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
        dateFrom: date[0] || null,
        dateTo: date[1] || null
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

const FiltersShape = PropTypes.shape({
  dateFrom: PropTypes.instanceOf(Date),
  dateTo: PropTypes.instanceOf(Date)
});

ComponentFilterDateRangePicker.propTypes = {
  setFilterValue: PropTypes.func.isRequired,
  filters: FiltersShape
};

ComponentFilterDateRangePicker.defaultProps = {
  filters: PropTypes.objectOf({
    dateFrom: null,
    dateTo: null
  })
};

export default ComponentFilterDateRangePicker;
