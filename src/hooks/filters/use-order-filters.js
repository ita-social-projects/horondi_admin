import { useDispatch, useSelector } from 'react-redux';

import {
  setOrderSort,
  setOrderFilter,
  clearOrderFilters,
  setOrderSortLabel
} from '../../redux/orders/orders.actions';
import { setCurrentPage } from '../../redux/table/table.actions';
import buttonTitles from '../../configs/button-titles';
import orders from '../../configs/orders';
import { paymentStatusFilterObj, statusFilterObject } from '../../utils/order';
import filterLabels from '../../configs/filter-labels';
import { sortDirection } from '../../configs/sort';

const useOrderFilters = () => {
  const dispatch = useDispatch();

  const { filters, sortLabel } = useSelector(({ Orders }) => ({
    filters: Orders.filters,
    sortLabel: Orders.sortLabel
  }));

  const setSorting = ({ key, type, value }) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setOrderSort({
        [key]: sortDirection[type]
      })
    );
    dispatch(setOrderSortLabel(value));
  };

  const setDateRangeFilter = (date) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setOrderFilter({
        dateFrom: date[0],
        dateTo: date[1]
      })
    );
  };

  const setSearchFilter = (search) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setOrderFilter({
        search
      })
    );
  };

  const setPaymentStatusFilter = (paymentStatus) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setOrderFilter({
        paymentStatus
      })
    );
  };

  const setStatusFilter = (status) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setOrderFilter({
        status
      })
    );
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearOrderFilters());
  };

  return {
    sortOptions: {
      labels: filterLabels.orders.sortLabels,
      setSorting,
      sortLabel
    },
    filterByDateOptions: {
      dateHandler: setDateRangeFilter,
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo
    },
    filterByMultipleOptions: [
      {
        filters: filters.paymentStatus,
        label: buttonTitles.PAYMENT_STATUS,
        selectItems: paymentStatusFilterObj(),
        setFilterHandler: setPaymentStatusFilter,
        objForTranslateRenderItems: orders.orderTableStatus
      },
      {
        filters: filters.status,
        label: buttonTitles.ORDER_STATUS,
        selectItems: statusFilterObject,
        setFilterHandler: setStatusFilter,
        objForTranslateRenderItems: orders.orderTableStatus
      }
    ],
    searchOptions: {
      search: filters.search,
      setSearchFilter
    },
    clearOptions: {
      filters,
      clearAllFilters
    }
  };
};

export default useOrderFilters;
