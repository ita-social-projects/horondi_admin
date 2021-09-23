import React from 'react';
import { useSelector } from 'react-redux';
import ContainerFilters from '../../../components/container-filters';
import ComponentFilterClear from '../../../components/filters-components/filter-clear';
import {
  clearFilters,
  setFilter
} from '../../../redux/categories/categories.actions';
import ComponentFilterSearch from '../../../components/filters-components/filter-search';

function Filters() {
  const { filters } = useSelector(({ Categories }) => Categories);

  return (
    <ContainerFilters>
      <ComponentFilterSearch
        setFilterValue={setFilter}
        value={filters.search}
        selectorFunc={(selector) => ({ search: selector })}
      />
      <ComponentFilterClear actionClearFilters={clearFilters} />
    </ContainerFilters>
  );
}

export default Filters;
