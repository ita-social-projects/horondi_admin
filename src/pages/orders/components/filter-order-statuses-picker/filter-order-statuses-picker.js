import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setOrderFilter } from '../../../../redux/orders/orders.actions';
import PickerOptions from '../../../../components/filters/options-picker';
import { setCurrentPage } from '../../../../redux/table/table.actions';
import buttonTitles from '../../../../configs/button-titles';
import { config } from '../../../../configs';

const FilterOrderStatusesPicker = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector(({ Orders }) => Orders);

  const setOrderStatusFilter = (status) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setOrderFilter({
        status
      })
    );
  };

  return (
    <PickerOptions
      value={filters.status}
      handler={setOrderStatusFilter}
      label={buttonTitles.ORDER_STATUS}
      options={config.labels.orders.select}
    />
  );
};

export default FilterOrderStatusesPicker;
