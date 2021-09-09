import { useDispatch, useSelector } from 'react-redux';

import {
  clearOrderFiltersUser,
  setOrderFilterUser
} from '../../redux/orders/orders.actions';
import { setCurrentPage } from '../../redux/table/table.actions';
import buttonTitles from '../../configs/button-titles';
import orders from '../../configs/orders';
import { paymentStatusFilterObj, statusFilterObject } from '../../utils/order';
import filterLabels from '../../configs/filter-labels';
import useOrderFilters from './use-order-filters';

const useOrderUserFilters = () => {
  const dispatch = useDispatch();

  const {
    sortOptions: { setSorting }
  } = useOrderFilters();

  const { filtersUser: filters, sortLabel } = useSelector(
    ({ Orders }) => Orders
  );

  const setDateRangeFilter = (date) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setOrderFilterUser({
        dateFrom: date[0],
        dateTo: date[1]
      })
    );
  };

  const setSearchFilter = (search) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setOrderFilterUser({
        search
      })
    );
  };

  const setPaymentStatusFilter = (paymentStatus) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setOrderFilterUser({
        paymentStatus
      })
    );
  };

  const setStatusFilter = (status) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setOrderFilterUser({
        status
      })
    );
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearOrderFiltersUser());
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

export default useOrderUserFilters;
