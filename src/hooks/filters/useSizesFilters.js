import { useDispatch, useSelector } from 'react-redux';

import {
  setSizeFilter,
  clearSizeFilters
} from '../../redux/sizes/sizes.actions';
import { setCurrentPage } from '../../redux/table/table.actions';
import buttonTitles from '../../configs/button-titles';
import sizesEnum, { availableEnum } from '../../configs/sizes-enum';
import {
  sizeAvailableObj,
  sizeFilterObj,
  sizePlaceholderSearch
} from '../../utils/size-helpers';

const useSizesFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(({ Sizes }) => Sizes.filters);

  const setSearchFilter = (searchBySimpleName) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setSizeFilter({
        searchBySimpleName
      })
    );
  };

  const setNameFilter = (name) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setSizeFilter({
        name
      })
    );
  };

  const setAvailableFilter = (available) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setSizeFilter({
        available
      })
    );
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearSizeFilters());
  };

  return {
    filterByMultipleOptions: [
      {
        filters: filters.name,
        label: buttonTitles.SIZE_NAME,
        selectItems: sizeFilterObj(),
        setFilterHandler: setNameFilter,
        objForTranslateRenderItems: sizesEnum
      },
      {
        filters: filters.available,
        label: buttonTitles.USER_STATUS_TITLE,
        selectItems: sizeAvailableObj(),
        setFilterHandler: setAvailableFilter,
        objForTranslateRenderItems: availableEnum
      }
    ],
    searchOptions: {
      search: filters.searchBySimpleName,
      placeholderText: sizePlaceholderSearch,
      setSearchFilter
    },
    clearOptions: {
      filters,
      clearAllFilters
    }
  };
};

export default useSizesFilters;
