import { useDispatch, useSelector } from 'react-redux';

import { clearFilters, setFilter } from '../../redux/model/model.actions';
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

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearFilters());
  };

  return {
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
