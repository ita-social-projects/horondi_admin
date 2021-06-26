import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState, useRef } from 'react';
import {
  setPatternFilter,
  clearPatternFilters
} from '../../redux/pattern/pattern.actions';
import { setCurrentPage } from '../../redux/table/table.actions';
import buttonTitles from '../../configs/button-titles';
import {
  statusPatternFilterObject,
  materialPatternFilterObject,
  materialPatternTableAction
} from '../../utils/pattern';
import {
  patternStatusTableAction,
  patternPlaceholderSearch
} from '../../consts/pattern-status';

const usePatternFilters = () => {
  const dispatch = useDispatch();

  const { filters, items } = useSelector(({ Pattern }) => ({
    filters: Pattern.filters,
    items: Pattern.items
  }));

  const meterialForGobelen = items?.map((item) => {
    const id = item.features.material._id;
    const name = item.features.material.name[0].value;
    return { id, name };
  });

  const sortMaterial = [
    ...new Map(meterialForGobelen?.map((item) => [item.id, item])).values()
  ];

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
        filters: filters?.material,
        label: buttonTitles.PATTERN_MATERIAL,
        selectItems: materialPatternFilterObject(sortMaterial),
        setFilterHandler: setMaterialFilter,
        objForTranslateRenderItems: materialPatternTableAction(sortMaterial)
      },
      {
        filters: filters?.available,
        label: buttonTitles.PATTERN_AVAILABLE,
        selectItems: statusPatternFilterObject,
        setFilterHandler: setStatusFilter,
        objForTranslateRenderItems: patternStatusTableAction
      }
    ],

    searchOptions: {
      placeholderText: patternPlaceholderSearch,
      search: filters?.name,
      setSearchFilter
    },
    clearOptions: {
      filters,
      clearAllFilters
    }
  };
};

export default usePatternFilters;
