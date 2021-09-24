import React from 'react';
import { useSelector } from 'react-redux';
import ContainerFilters from '../../../components/container-filters';
import ComponentFilterClear from '../../../components/filters-components/filter-clear';
import {
  setSizeFilter,
  clearSizeFilters
} from '../../../redux/sizes/sizes.actions';
import buttonTitles from '../../../configs/button-titles';
import ComponentFilterMultiplePicker from '../../../components/filters-components/filter-multiple-picker';
import { sizeAvailableObj, sizeFilterObj } from '../../../utils/size-helpers';
import ComponentFilterSearch from '../../../components/filters-components/filter-search';

function Filters() {
  const { filters } = useSelector(({ Sizes }) => Sizes);

  const sizesOptions = [...sizeFilterObj()];
  const sizesAvaliableOptions = [...sizeAvailableObj()];

  return (
    <ContainerFilters>
      <ComponentFilterMultiplePicker
        setFilterValue={setSizeFilter}
        selectorFunc={(selector) => ({ available: selector })}
        value={filters.available}
        options={sizesAvaliableOptions}
        label={buttonTitles.USER_STATUS_TITLE}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setSizeFilter}
        selectorFunc={(selector) => ({ name: selector })}
        value={filters.name}
        options={sizesOptions}
        label={buttonTitles.SIZE_NAME}
      />
      <ComponentFilterSearch
        setFilterValue={setSizeFilter}
        value={filters.searchBySimpleName}
        selectorFunc={(selector) => ({ searchBySimpleName: selector })}
      />
      <ComponentFilterClear actionClearFilters={clearSizeFilters} />
    </ContainerFilters>
  );
}

export default Filters;
