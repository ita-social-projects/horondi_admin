import React from 'react';
import { useSelector } from 'react-redux';
import ContainerFilters from '../../../../components/container-filters';
import ComponentFilterClear from '../../../../components/filters-components/filter-clear';
import ComponentFilterDateRangePicker from '../../../../components/filters-components/filter-date-range-picker';
import ComponentFilterSinglePicker from '../../../../components/filters-components/filter-single-picker';
import filterLabels from '../../../../configs/filter-labels';
import {
  setReplyFilter,
  setReplySort,
  setReplySortLabel,
  clearReplyFilters
} from '../../../../redux/comments/comments.actions';
import { sortLabel as labelSort } from '../../../../configs/sort';
import { setCurrentPage } from '../../../../redux/table/table.actions';
import buttonTitles from '../../../../configs/button-titles';
import ComponentFilterMultiplePicker from '../../../../components/filters-components/filter-multiple-picker';
import ComponentFilterSearch from '../../../../components/filters-components/filter-search';
import { showFilterObj } from '../../../../utils/comment';

function Filters() {
  const { replyFilters: filters, replySortLabel } = useSelector(
    ({ Comments }) => Comments
  );

  return (
    <ContainerFilters>
      <ComponentFilterDateRangePicker
        actionSetCurrentPage={setCurrentPage}
        actionSetFilter={setReplyFilter}
        filters={filters}
      />
      <ComponentFilterSinglePicker
        actionSetCurrentPage={setCurrentPage}
        actionSetSingleFilter={setReplySort}
        actionSetLabel={setReplySortLabel}
        value={replySortLabel}
        options={filterLabels.reply.sortLabels}
        label={labelSort}
      />
      <ComponentFilterMultiplePicker
        actionSetCurrentPage={setCurrentPage}
        actionSetMultipleFilter={setReplyFilter}
        selectorFunc={(selector) => ({ show: selector })}
        value={filters.show}
        options={showFilterObj}
        label={buttonTitles.USER_STATUS_TITLE}
      />
      <ComponentFilterSearch
        actionSetCurrentPage={setCurrentPage}
        actionSetSearchFilter={setReplyFilter}
        value={filters.search}
        selectorFunc={(selector) => ({ search: selector })}
      />
      <ComponentFilterClear
        actionSetCurrentPage={setCurrentPage}
        actionClearFilters={clearReplyFilters}
      />
    </ContainerFilters>
  );
}

export default Filters;
