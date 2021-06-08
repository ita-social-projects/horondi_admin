import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import {
  setPatternSort,
  setPatternFilter,
  clearPatternFilters,
  setPatternSortLabel
} from '../../redux/pattern/pattern.actions';
import { setCurrentPage } from '../../redux/table/table.actions';
import titles from '../../configs/titles';
import buttonTitles from '../../configs/button-titles';
import patterns from '../../configs/patterns';
import { paymentStatusFilterObj, statusFilterObject } from '../../utils/order';
import filterLabels from '../../configs/filter-labels';
import { sortDirection } from '../../configs/sort';

const usePatternFilters = () => {
  const dispatch = useDispatch();

  const { filters, sortLabel } = useSelector(({ Pattern }) => ({
    filters: Pattern.filters
    //  sortLabel: Patterns.sortLabel
  }));

  const setSorting = ({ key, type, value }) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setPatternSort({
        [key]: sortDirection[type]
      })
    );
    dispatch(setPatternSortLabel(value));
  };

  const setSearchFilter = (name) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setPatternFilter({
        name
      })
    );
  };

  const setStatusFilter = (status) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setPatternFilter({
        status
      })
    );
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearPatternFilters());
  };

  return {
    sortOptions: {
      labels: filterLabels.orders.sortLabels,
      setSorting,
      sortLabel
    },
    // filterByMultipleOptions: [
    //     {
    //         filters: filters.paymentStatus,
    //         label: buttonTitles.PAYMENT_STATUS,
    //       selectItems: paymentStatusFilterObj(),
    //     setFilterHandler: setPaymentStatusFilter,
    //   objForTranslateRenderItems: orders.orderTableStatus
    // },
    // {
    //     filters: filters.status,
    //     label: buttonTitles.STATUS,
    //     selectItems: statusFilterObject,
    //     setFilterHandler: setStatusFilter,
    //   objForTranslateRenderItems: orders.orderTableStatus
    //     }
    // ],
    searchOptions: {
      name: filters.search,
      setSearchFilter
    },
    clearOptions: {
      filters,
      clearAllFilters
    }
  };
};

export default usePatternFilters;
