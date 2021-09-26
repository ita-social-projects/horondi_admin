import React from 'react';
import { useSelector } from 'react-redux';
import ContainerFilters from '../../../../../components/container-filters';
import ComponentFilterClear from '../../../../../components/filters-components/filter-clear';
import ComponentFilterDateRangePicker from '../../../../../components/filters-components/filter-date-range-picker';
import ComponentFilterSinglePicker from '../../../../../components/filters-components/filter-single-picker';
import filterLabels from '../../../../../configs/filter-labels';
import {
  clearFiltersUser,
  setFilterUser,
  setSortLabel
} from '../../../../../redux/comments/comments.actions';
import { sortLabel as labelSort } from '../../../../../configs/sort';
import buttonTitles from '../../../../../configs/button-titles';
import ComponentFilterMultiplePicker from '../../../../../components/filters-components/filter-multiple-picker';
import ComponentFilterSearch from '../../../../../components/filters-components/filter-search';
import { commentsOptions, showFilterObj } from '../../../../../utils/comment';
import ComponentFilterRadioPicker from '../../../../../components/filters-components/filter-radio-picker';

function Filters() {
  const { filtersUser: filters, sortLabel } = useSelector(
    ({ Comments }) => Comments
  );
  const showOptions = [...showFilterObj()];

  return (
    <ContainerFilters>
      <ComponentFilterRadioPicker
        setFilterValue={setFilterUser}
        actionSetLabel={setSortLabel}
        selectorFunc={(selector) => ({ typeComment: selector })}
        value={filters.typeComment}
        options={commentsOptions}
        label={buttonTitles.COMMENT_TYPE}
      />
      <ComponentFilterDateRangePicker
        setFilterValue={setFilterUser}
        filters={filters}
      />
      <ComponentFilterSinglePicker
        setFilterValue={setFilterUser}
        actionSetLabel={setSortLabel}
        value={sortLabel}
        options={filterLabels.reply.sortLabels}
        label={labelSort}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setFilterUser}
        selectorFunc={(selector) => ({ show: selector })}
        value={filters.show}
        options={showOptions}
        label={buttonTitles.USER_STATUS_TITLE}
      />
      <ComponentFilterSearch
        setFilterValue={setFilterUser}
        value={filters.search}
        selectorFunc={(selector) => ({ search: selector })}
      />
      <ComponentFilterClear actionClearFilters={clearFiltersUser} />
    </ContainerFilters>
  );
}

export default Filters;
