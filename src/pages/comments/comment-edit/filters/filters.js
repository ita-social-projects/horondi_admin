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

  const showOptions = [...showFilterObj()];

  return (
    <ContainerFilters>
      <ComponentFilterDateRangePicker
        setFilterValue={setReplyFilter}
        filters={filters}
      />
      <ComponentFilterSinglePicker
        setFilterValue={setReplySort}
        actionSetLabel={setReplySortLabel}
        value={replySortLabel}
        options={filterLabels.reply.sortLabels}
        label={labelSort}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setReplyFilter}
        selectorFunc={(selector) => ({ show: selector })}
        value={filters.show}
        options={showOptions}
        label={buttonTitles.USER_STATUS_TITLE}
      />
      <ComponentFilterSearch
        setFilterValue={setReplyFilter}
        value={filters.search}
        selectorFunc={(selector) => ({ search: selector })}
      />
      <ComponentFilterClear actionClearFilters={clearReplyFilters} />
    </ContainerFilters>
  );
}

export default Filters;
