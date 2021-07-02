import { useDispatch, useSelector } from 'react-redux';
import { sortDirection } from '../../configs/sort';
import filterLabels from '../../configs/filter-labels';
import {
  clearFilters,
  setFilter,
  setSort,
  setModelSortLabel
} from '../../redux/model/model.actions';
import { setCurrentPage } from '../../redux/table/table.actions';
import buttonTitles from '../../configs/button-titles';
import {
  placeholderModelSearch,
  categoryFilterObj,
  availableFilterObj,
  availableForConstructorFilterObj,
  availableForConstructorOptions,
  availableOptions,
  categoryOptions,
  convertToCatOptions
} from '../../utils/model';

const useModelFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(({ Model }) => Model.filters);
  const sortLabel = useSelector(({ Model }) => Model.sortLabel);
  convertToCatOptions(useSelector(({ Categories }) => Categories.categories));

  const setCategoryFilter = (category) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        category
      })
    );
  };

  const setAvailableFilter = (available) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        available
      })
    );
  };

  const setAvailableForConstructorFilter = (availableForConstructor) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        availableForConstructor
      })
    );
  };

  const setSearchFilter = (search) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        search
      })
    );
  };

  const setSorting = ({ key, type, value }) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setSort({
        [key]: sortDirection[type]
      })
    );
    dispatch(setModelSortLabel(value));
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearFilters());
  };

  return {
    sortOptions: {
      labels: filterLabels.models.sortLabels,
      setSorting,
      sortLabel
    },
    filterByMultipleOptions: [
      {
        filters: filters.category,
        label: buttonTitles.CATEGORY_TITLE,
        selectItems: categoryFilterObj(),
        setFilterHandler: setCategoryFilter,
        objForTranslateRenderItems: categoryOptions
      },
      {
        filters: filters.available,
        label: buttonTitles.USER_STATUS_TITLE,
        selectItems: availableFilterObj(),
        setFilterHandler: setAvailableFilter,
        objForTranslateRenderItems: availableOptions
      },
      {
        filters: filters.availableForConstructor,
        label: buttonTitles.AVAILABLE_FOR_CONSTRUCTOR_TITLE,
        selectItems: availableForConstructorFilterObj(),
        setFilterHandler: setAvailableForConstructorFilter,
        objForTranslateRenderItems: availableForConstructorOptions
      }
    ],
    searchOptions: {
      search: filters.search,
      placeholderText: placeholderModelSearch,
      setSearchFilter
    },
    clearOptions: {
      filters,
      clearAllFilters
    }
  };
};

export default useModelFilters;
