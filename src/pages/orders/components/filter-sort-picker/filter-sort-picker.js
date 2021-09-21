import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OptionPicker from '../../../../components/filters/option-picker';
import { sortLabel, sortDirection } from '../../../../configs/sort';
import filterLabels from '../../../../configs/filter-labels';
import {
  setOrderSort,
  setOrderSortLabel
} from '../../../../redux/orders/orders.actions';
import { setCurrentPage } from '../../../../redux/table/table.actions';

const FilterSortPicker = () => {
  const dispatch = useDispatch();
  const { sortLabel: sortValue } = useSelector(({ Orders }) => Orders);

  const setSortFilter = ({ key, type, value }) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setOrderSort({
        [key]: sortDirection[type]
      })
    );
    dispatch(setOrderSortLabel(value));
  };

  return (
    <OptionPicker
      handler={setSortFilter}
      value={sortValue}
      options={filterLabels.orders.sortLabels}
      label={sortLabel}
    />
  );
};

export default FilterSortPicker;
