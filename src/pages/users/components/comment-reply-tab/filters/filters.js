import React from 'react';
import { useSelector } from 'react-redux';
import ContainerFilters from '../../../../../components/container-filters';
import ComponentFilterClear from '../../../../../components/filters-components/filter-clear';
import ComponentFilterDateRangePicker from '../../../../../components/filters-components/filter-date-range-picker';
import ComponentFilterSinglePicker from '../../../../../components/filters-components/filter-single-picker';
import filterLabels from '../../../../../configs/filter-labels';
import {
  clearFiltersReplyUser,
  setFilterReplyUser,
  setReplySortLabel,
  setSortLabel
} from '../../../../../redux/comments/comments.actions';
import { sortLabel as labelSort } from '../../../../../configs/sort';
import buttonTitles from '../../../../../configs/button-titles';
import ComponentFilterMultiplePicker from '../../../../../components/filters-components/filter-multiple-picker';
import ComponentFilterSearch from '../../../../../components/filters-components/filter-search';
import { commentFilterObj, showFilterObj } from '../../../../../utils/comment';
import ComponentFilterRadioPicker from '../../../../../components/filters-components/filter-radio-picker';

function Filters() {
  const { filtersReplyUser: filters, replySortLabel } = useSelector(
    ({ Comments }) => Comments
  );
  const { filtersUser } = useSelector(({ Comments }) => Comments);

  const showOptions = [...showFilterObj()];

  return (
    <ContainerFilters>
      <ComponentFilterRadioPicker
        setFilterValue={setFilterReplyUser}
        actionSetLabel={setSortLabel}
        selectorFunc={(selector) => ({ typeComment: selector })}
        value={filtersUser.typeComment}
        options={commentFilterObj}
        label={buttonTitles.COMMENT_TYPE}
      />

      <ComponentFilterDateRangePicker
        setFilterValue={setFilterReplyUser}
        filters={filters}
      />
      <ComponentFilterSinglePicker
        setFilterValue={setFilterReplyUser}
        actionSetLabel={setReplySortLabel}
        value={replySortLabel}
        options={filterLabels.reply.sortLabels}
        label={labelSort}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setFilterReplyUser}
        selectorFunc={(selector) => ({ show: selector })}
        value={filters.show}
        options={showOptions}
        label={buttonTitles.USER_STATUS_TITLE}
      />
      <ComponentFilterSearch
        setFilterValue={setFilterReplyUser}
        value={filters.search}
        selectorFunc={(selector) => ({ search: selector })}
      />
      <ComponentFilterClear actionClearFilters={clearFiltersReplyUser} />
    </ContainerFilters>
  );
}

export default Filters;
