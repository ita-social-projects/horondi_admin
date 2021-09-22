import React from 'react';
import { useSelector } from 'react-redux';
import ContainerFilters from '../../../components/container-filters';
import { setSizeFilter } from '../../../redux/sizes/sizes.actions';
import buttonTitles from '../../../configs/button-titles';
import { setCurrentPage } from '../../../redux/table/table.actions';
import ComponentFilterMultiplePicker from '../../../components/filters-components/filter-multiple-picker';
import { sizeAvailableObj, sizeFilterObj } from '../../../utils/size-helpers';

function Filters() {
  const { filters } = useSelector(({ Sizes }) => Sizes);

  const sizesOptions = [...sizeFilterObj()];
  const sizesAvaliableOptions = [...sizeAvailableObj()];

  return (
    <ContainerFilters>
      <ComponentFilterMultiplePicker
        actionSetCurrentPage={setCurrentPage}
        actionSetMultipleFilter={setSizeFilter}
        selectorFunc={(selector) => ({ available: selector })}
        value={filters.available}
        options={sizesAvaliableOptions}
        label={buttonTitles.USER_STATUS_TITLE}
      />
      <ComponentFilterMultiplePicker
        actionSetCurrentPage={setCurrentPage}
        actionSetMultipleFilter={setSizeFilter}
        selectorFunc={(selector) => ({ name: selector })}
        value={filters.name}
        options={sizesOptions}
        label={buttonTitles.SIZE_NAME}
      />
    </ContainerFilters>
  );
}

export default Filters;
