import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/table/table.actions';
import buttonTitles from '../../configs/button-titles';
import { availableEnum } from '../../configs/sizes-enum';
import { sizeAvailableObj } from '../../utils/size-helpers';
import {
  clearMaterialFilters,
  setMaterialFilter
} from '../../redux/material/material.actions';
import {
  placeholderMaterialText,
  purposeFilterObj
} from '../../utils/material';
import { materialTranslations } from '../../configs/error-modal-messages';

const useMaterialFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(({ Material }) => Material.filters);

  const setSearchFilter = (name) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setMaterialFilter({
        name
      })
    );
  };

  const setColorsFilter = (colors) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setMaterialFilter({
        colors
      })
    );
  };
  const setPurposeFilter = (purpose) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setMaterialFilter({
        purpose
      })
    );
  };

  const setAvailableFilter = (available) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setMaterialFilter({
        available
      })
    );
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearMaterialFilters());
  };

  return {
    filterByMultipleOptions: [
      {
        filters: filters.purpose,
        label: buttonTitles.PURPOSE,
        selectItems: purposeFilterObj(),
        setFilterHandler: setPurposeFilter,
        objForTranslateRenderItems: materialTranslations.purpose
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
      search: filters.name,
      placeholderText: placeholderMaterialText,
      setSearchFilter
    },
    setColorsFilter,
    clearOptions: {
      filters,
      clearAllFilters
    }
  };
};

export default useMaterialFilters;
