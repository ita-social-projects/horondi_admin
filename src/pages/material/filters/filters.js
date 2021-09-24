import React from 'react';
import { useSelector } from 'react-redux';
import ContainerFilters from '../../../components/container-filters';
import ComponentFilterClear from '../../../components/filters-components/filter-clear';
import {
  clearMaterialFilters,
  setMaterialFilter
} from '../../../redux/material/material.actions';
import buttonTitles from '../../../configs/button-titles';
import ComponentFilterMultiplePicker from '../../../components/filters-components/filter-multiple-picker';
import { purposeFilterObj } from '../../../utils/material';
import ComponentFilterSearch from '../../../components/filters-components/filter-search';
import { sizeAvailableObj } from '../../../utils/size-helpers';

function Filters() {
  const { filters } = useSelector(({ Material }) => Material);

  const purposeOptions = [...purposeFilterObj()];
  const sizeOptions = [...sizeAvailableObj()];
  return (
    <ContainerFilters>
      <ComponentFilterMultiplePicker
        setFilterValue={setMaterialFilter}
        selectorFunc={(selector) => ({ purpose: selector })}
        value={filters.purpose}
        options={purposeOptions}
        label={buttonTitles.PURPOSE}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setMaterialFilter}
        selectorFunc={(selector) => ({ available: selector })}
        value={filters.available}
        options={sizeOptions}
        label={buttonTitles.USER_STATUS_TITLE}
      />
      <ComponentFilterSearch
        setFilterValue={setMaterialFilter}
        value={filters.name}
        selectorFunc={(selector) => ({ name: selector })}
      />
      <ComponentFilterClear actionClearFilters={clearMaterialFilters} />
    </ContainerFilters>
  );
}

export default Filters;
