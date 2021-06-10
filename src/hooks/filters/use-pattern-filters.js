import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import {
  setPatternFilter,
  clearPatternFilters
} from '../../redux/pattern/pattern.actions';
import { setCurrentPage } from '../../redux/table/table.actions';
import buttonTitles from '../../configs/button-titles';
import {
  materialPatternTableAction,
  patternStatusTableAction
} from '../../configs/patterns';
import {
  statusPatternFilterObject,
  materialPatternFilterObject
} from '../../utils/pattern';

const usePatternFilters = () => {
  const dispatch = useDispatch();

  const { filters } = useSelector(({ Pattern }) => ({
    filters: Pattern.filters
  }));

  const setSearchFilter = (name) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setPatternFilter({
        name
      })
    );
  };

  const setStatusFilter = (available) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setPatternFilter({
        available
      })
    );
  };
  const setMaterialFilter = (material) => {
    console.log(material);
    dispatch(setCurrentPage(0));
    dispatch(
      setPatternFilter({
        material
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
        label: buttonTitles.PATTERN_MATERIAL,
        selectItems: materialPatternFilterObject,
        setFilterHandler: setMaterialFilter,
        objForTranslateRenderItems: materialPatternTableAction
      },
      {
        filters: filters.available,
        label: buttonTitles.PATTERN_AVAILABLE,
        selectItems: statusPatternFilterObject,
        setFilterHandler: setStatusFilter,
        objForTranslateRenderItems: patternStatusTableAction
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
