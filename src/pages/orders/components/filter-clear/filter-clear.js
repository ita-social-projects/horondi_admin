import React from 'react';
import { useDispatch } from 'react-redux';

import Clear from '../../../../components/filters/clear';
import { clearOrderFilters } from '../../../../redux/orders/orders.actions';
import { setCurrentPage } from '../../../../redux/table/table.actions';

const FilterClear = () => {
  const dispatch = useDispatch();

  const clearFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearOrderFilters());
  };

  return <Clear handler={clearFilters} />;
};

export default FilterClear;
