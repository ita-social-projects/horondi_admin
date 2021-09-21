import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setOrderFilter } from '../../../../redux/orders/orders.actions';
import DateRangePicker from '../../../../components/filters/date-range-picker';
import { setCurrentPage } from '../../../../redux/table/table.actions';

const FilterDateRangePicker = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector(({ Orders }) => Orders);

  const setDateRangeFilter = (date) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setOrderFilter({
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

export default FilterDateRangePicker;
