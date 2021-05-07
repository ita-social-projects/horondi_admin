import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { setCurrentPage } from '../../redux/table/table.actions';
import buttonTitles from '../../configs/button-titles';
import {
  clearProductFilter,
  getProductDetails,
  setProductFilter,
  setProductSort
} from '../../redux/products/products.actions';
import {
  dataFilterObj,
  dataRenderObj,
  placeholderProductSearch
} from '../../utils/product';
import { sortDirection } from '../../configs/sort';
import filterLabels from '../../configs/filter-labels';
import { selectProductsLoadingAndDetails } from '../../redux/selectors/products.selectors';

const useProductFilters = () => {
  const dispatch = useDispatch();

  const { filters } = useSelector(({ Products }) => ({
    filters: Products.filters
  }));

  const { details } = useSelector(selectProductsLoadingAndDetails);

  useEffect(() => {
    dispatch(getProductDetails());
  }, [dispatch]);

  const setSorting = (key, type) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setProductSort({
        [key]: sortDirection[type]
      })
    );
  };

  const setCategoryFilter = (category) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setProductFilter({
        category
      })
    );
  };
  const setModelsFilter = (models) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setProductFilter({
        models
      })
    );
  };
  const setPatternFilter = (pattern) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setProductFilter({
        pattern
      })
    );
  };
  const setSearchFilter = (search) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setProductFilter({
        search
      })
    );
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearProductFilter());
  };

  return {
    filterByMultipleOptions: [
      {
        filters: filters.category,
        label: buttonTitles.CATEGORY,
        selectItems: dataFilterObj(details?.categories),
        setFilterHandler: setCategoryFilter,
        objForTranslateRenderItems: dataRenderObj(details?.categories)
      },
      {
        filters: filters.models,
        label: buttonTitles.MODEL,
        selectItems: dataFilterObj(details?.models),
        setFilterHandler: setModelsFilter,
        objForTranslateRenderItems: dataRenderObj(details?.models)
      },
      {
        filters: filters.pattern,
        label: buttonTitles.PATTERN,
        selectItems: dataFilterObj(details?.patterns),
        setFilterHandler: setPatternFilter,
        objForTranslateRenderItems: dataRenderObj(details?.patterns)
      }
    ],
    searchOptions: {
      search: filters.search,
      placeholderText: placeholderProductSearch,
      setSearchFilter
    },
    clearOptions: {
      filters,
      clearAllFilters
    },
    sortOptions: {
      labels: filterLabels.products.sortLabels,
      setSorting
    }
  };
};

export default useProductFilters;
