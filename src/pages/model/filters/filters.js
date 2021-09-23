import React from 'react';
import { useSelector } from 'react-redux';
import ContainerFilters from '../../../components/container-filters';
import ComponentFilterClear from '../../../components/filters-components/filter-clear';
import ComponentFilterSinglePicker from '../../../components/filters-components/filter-single-picker';
import filterLabels from '../../../configs/filter-labels';
import {
  clearFilters,
  setFilter,
  setSort,
  setModelSortLabel
} from '../../../redux/model/model.actions';
import { sortLabel } from '../../../configs/sort';
import { setCurrentPage } from '../../../redux/table/table.actions';
import buttonTitles from '../../../configs/button-titles';
import ComponentFilterMultiplePicker from '../../../components/filters-components/filter-multiple-picker';
import {
  availableFilterObj,
  availableForConstructorFilterObj
} from '../../../utils/model';
import ComponentFilterSearch from '../../../components/filters-components/filter-search';

function Filters() {
  const { filters, sortLabel: sortValue } = useSelector(({ Model }) => Model);
  const { categories } = useSelector(({ Categories }) => Categories);

  const availableOptions = [...availableFilterObj()];
  const availableConstructorOptions = [...availableForConstructorFilterObj()];

  const categoryOptions = {};

  categories.map((category) =>
    Object.assign(categoryOptions, { [category._id]: category.name[0].value })
  );

  const categoryFilterObj = Object.entries(categoryOptions).map(
    ([key, value]) => ({ value: key, label: value })
  );

  return (
    <ContainerFilters>
      <ComponentFilterSinglePicker
        setFilterValue={setSort}
        actionSetLabel={setModelSortLabel}
        value={sortValue}
        options={filterLabels.models.sortLabels}
        label={sortLabel}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setFilter}
        selectorFunc={(selector) => ({ category: selector })}
        value={filters.category}
        options={categoryFilterObj}
        label={buttonTitles.CATEGORY_TITLE}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setFilter}
        selectorFunc={(selector) => ({ available: selector })}
        value={filters.available}
        options={availableOptions}
        label={buttonTitles.USER_STATUS_TITLE}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setFilter}
        selectorFunc={(selector) => ({ availableForConstructor: selector })}
        value={filters.availableForConstructor}
        options={availableConstructorOptions}
        label={buttonTitles.AVAILABLE_FOR_CONSTRUCTOR_TITLE}
      />
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
