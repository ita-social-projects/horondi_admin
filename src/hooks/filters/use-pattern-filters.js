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
import {
  paymentStatusFilterObj,
  statusFilterObject,
  statusPatternFilterObject
} from '../../utils/order';
import filterLabels from '../../configs/filter-labels';
import { sortDirection } from '../../configs/sort';
import orders from '../../configs/orders';

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

  const setStatusFilter = (available) => {
    console.log(available);
    dispatch(setCurrentPage(0));
    dispatch(
      setPatternFilter({
        available
      })
    );
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearPatternFilters());
  };

  return {
    filterByMultipleOptions: [
      {
        filters: filters.available,
        label: buttonTitles.PATTERN_AVAILABLE,
        selectItems: statusPatternFilterObject,
        setFilterHandler: setStatusFilter,
        objForTranslateRenderItems: patterns.patternTableStatus
      }
    ],

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
