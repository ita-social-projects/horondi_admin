import React from 'react';
import { useSelector } from 'react-redux';
import ContainerFilters from '../../../components/container-filters';
import ComponentFilterClear from '../../../components/filters-components/filter-clear';
import ComponentFilterDateRangePicker from '../../../components/filters-components/filter-date-range-picker';
import ComponentFilterSinglePicker from '../../../components/filters-components/filter-single-picker';
import filterLabels from '../../../configs/filter-labels';
import {
  clearFilters,
  setFilter,
  setSort,
  setSortLabel
} from '../../../redux/comments/comments.actions';
import { sortLabel as labelSort } from '../../../configs/sort';
import buttonTitles from '../../../configs/button-titles';
import ComponentFilterMultiplePicker from '../../../components/filters-components/filter-multiple-picker';
import ComponentFilterSearch from '../../../components/filters-components/filter-search';
import { showFilterObj } from '../../../utils/comment';

function Filters() {
  const { filters, sortLabel } = useSelector(({ Comments }) => Comments);

  const showOptions = [...showFilterObj()];

  return (
    <ContainerFilters>
      <ComponentFilterDateRangePicker
        setFilterValue={setFilter}
        filters={filters}
      />
      <ComponentFilterSinglePicker
        setFilterValue={setSort}
        actionSetLabel={setSortLabel}
        value={sortLabel}
        options={filterLabels.comments.sortLabels}
        label={labelSort}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setFilter}
        selectorFunc={(selector) => ({ show: selector })}
        value={filters.show}
        options={showOptions}
        label={buttonTitles.USER_STATUS_TITLE}
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
