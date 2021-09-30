import React from 'react';
import { useSelector } from 'react-redux';
import ContainerFilters from '../../../components/container-filters';
import ComponentFilterClear from '../../../components/filters-components/filter-clear';
import ComponentFilterDateRangePicker from '../../../components/filters-components/filter-date-range-picker';
import {
  clearFilters,
  setFilter
} from '../../../redux/email-questions/email-questions.actions';
import buttonTitles from '../../../configs/button-titles';
import ComponentFilterMultiplePicker from '../../../components/filters-components/filter-multiple-picker';
import ComponentFilterSearch from '../../../components/filters-components/filter-search';
import { showFilterObj } from '../../../utils/questions';

function Filters() {
  const { filters } = useSelector(({ EmailQuestions }) => EmailQuestions);

  const showOptions = [...showFilterObj()];

  const filtersSelector = (selector) => ({ filters: selector });
  const searchSelector = (selector) => ({ search: selector });

  return (
    <ContainerFilters>
      <ComponentFilterDateRangePicker
        setFilterValue={setFilter}
        filters={filters}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setFilter}
        selectorFunc={filtersSelector}
        value={filters.filters}
        options={showOptions}
        label={buttonTitles.USER_STATUS_TITLE}
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
