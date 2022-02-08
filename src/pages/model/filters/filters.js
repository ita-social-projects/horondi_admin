import React from 'react';
import { useSelector } from 'react-redux';
import ContainerFilters from '../../../components/container-filters';
import ComponentFilterClear from '../../../components/filters-components/filter-clear';
import ComponentFilterSinglePicker from '../../../components/filters-components/filter-single-picker';
import ComponentFilterMultiplePicker from '../../../components/filters-components/filter-multiple-picker';
import filterLabels from '../../../configs/filter-labels';
import {
  clearFilters,
  setFilter,
  setSort,
  setModelSortLabel
} from '../../../redux/model/model.actions';
import { sortLabel } from '../../../configs/sort';
import buttonTitles from '../../../configs/button-titles';
import {
  availableFilterObj,
  availableForConstructorFilterObj
} from '../../../utils/model';
import ComponentFilterSearch from '../../../components/filters-components/filter-search';

function Filters() {
  const { filters, sortLabel: sortValue } = useSelector(({ Model }) => Model);
  const { categories } = useSelector(({ Categories }) => Categories);
  const categoryOptions = {};

  categories.map((category) =>
    Object.assign(categoryOptions, { [category._id]: category.name[0].value })
  );

  const categoryFilterObj = Object.entries(categoryOptions).map(
    ([key, value]) => ({ value: key, label: value })
  );

  const availableOptions = [...availableFilterObj()];

  const availableConstrOptions = [...availableForConstructorFilterObj()];

  const categorySelector = (selector) => ({ category: selector });
  const availableSelector = (selector) => ({ available: selector });
  const availableForConstructorSelector = (selector) => ({
    availableForConstructor: selector
  });
  const searchSelector = (selector) => ({ search: selector });

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
        setFilterValue={setFilter} // записується тип для фільтрації
        selectorFunc={categorySelector} // записується селектор
        value={filters.category} // записується значення обраної категорії
        options={categoryFilterObj} // назва категорії та її значення
        label={buttonTitles.CATEGORY_TITLE} // тайтл селекту
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setFilter}
        selectorFunc={availableSelector}
        value={filters.available}
        options={availableOptions}
        label={buttonTitles.USER_STATUS_TITLE}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setFilter}
        selectorFunc={availableForConstructorSelector}
        value={filters.availableForConstructor}
        options={availableConstrOptions}
        label={buttonTitles.AVAILABLE_FOR_CONSTRUCTOR_TITLE}
      />
      <ComponentFilterSearch
        setFilterValue={setFilter}
        value={filters.search}
        selectorFunc={searchSelector}
      />
      <ComponentFilterClear actionClearFilters={clearFilters} />
    </ContainerFilters>
  );
}

export default Filters;
