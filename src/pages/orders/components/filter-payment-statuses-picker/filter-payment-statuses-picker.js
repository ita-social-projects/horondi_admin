import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setOrderFilter } from '../../../../redux/orders/orders.actions';
import PickerOptions from '../../../../components/filters/options-picker';
import { setCurrentPage } from '../../../../redux/table/table.actions';
import buttonTitles from '../../../../configs/button-titles';
import { paymentStatusFilterObj } from '../../../../utils/order';

const FilterPaymentStatusesPicker = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector(({ Orders }) => Orders);

  const setPaymentStatusFilter = (paymentStatus) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setOrderFilter({
        paymentStatus
      })
    );
  };

  return (
    <PickerOptions
      value={filters.paymentStatus}
      handler={setPaymentStatusFilter}
      label={buttonTitles.PAYMENT_STATUS}
      options={paymentStatusFilterObj()}
    />
  );
};

export default FilterPaymentStatusesPicker;
