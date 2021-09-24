import React from 'react';
import { useSelector } from 'react-redux';
import ContainerFilters from '../../../components/container-filters';
import ComponentFilterClear from '../../../components/filters-components/filter-clear';
import {
  setPatternFilter,
  clearPatternFilters
} from '../../../redux/pattern/pattern.actions';
import buttonTitles from '../../../configs/button-titles';
import ComponentFilterMultiplePicker from '../../../components/filters-components/filter-multiple-picker';
import {
  statusPatternFilterObject,
  materialFilterObj
} from '../../../utils/pattern';
import ComponentFilterSearch from '../../../components/filters-components/filter-search';

function Filters() {
  const { filters } = useSelector(({ Pattern }) => Pattern);

  const materialOptions = [...materialFilterObj()];
  return (
    <ContainerFilters>
      <ComponentFilterMultiplePicker
        setFilterValue={setPatternFilter}
        selectorFunc={(selector) => ({ material: selector })}
        value={filters?.material}
        options={materialOptions}
        label={buttonTitles.PATTERN_MATERIAL}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setPatternFilter}
        selectorFunc={(selector) => ({ available: selector })}
        value={filters?.available}
        options={statusPatternFilterObject}
        label={buttonTitles.PATTERN_AVAILABLE}
      />
      <ComponentFilterSearch
        setFilterValue={setPatternFilter}
        value={filters?.name}
        selectorFunc={(selector) => ({ name: selector })}
      />
      <ComponentFilterClear actionClearFilters={clearPatternFilters} />
    </ContainerFilters>
  );
}

export default Filters;
