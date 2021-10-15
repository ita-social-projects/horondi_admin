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
  setFilterUser,
  setReplySortLabel,
  setSortLabel
} from '../../../../../redux/comments/comments.actions';
import { sortLabel as labelSort } from '../../../../../configs/sort';
import buttonTitles from '../../../../../configs/button-titles';
import ComponentFilterMultiplePicker from '../../../../../components/filters-components/filter-multiple-picker';
import ComponentFilterSearch from '../../../../../components/filters-components/filter-search';
import { commentsOptions, showFilterObj } from '../../../../../utils/comment';
import ComponentFilterRadioPicker from '../../../../../components/filters-components/filter-radio-picker';

function Filters() {
  const { filtersReplyUser: filters, replySortLabel } = useSelector(
    ({ Comments }) => Comments
  );
  const { filtersUser } = useSelector(({ Comments }) => Comments);

  const showOptions = [...showFilterObj()];
  const typeCommentSelector = (selector) => ({ typeComment: selector });
  const showSelector = (selector) => ({ show: selector });
  const searchSelector = (selector) => ({ search: selector });

  return (
    <ContainerFilters>
      <ComponentFilterRadioPicker
        setFilterValue={setFilterUser}
        actionSetLabel={setSortLabel}
        selectorFunc={typeCommentSelector}
        value={filtersUser.typeComment}
        options={commentsOptions}
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
        selectorFunc={showSelector}
        value={filters.show}
        options={showOptions}
        label={buttonTitles.USER_STATUS_TITLE}
      />
      <ComponentFilterSearch
        setFilterValue={setFilterReplyUser}
        value={filters.search}
        selectorFunc={searchSelector}
      />
      <ComponentFilterClear actionClearFilters={clearFiltersReplyUser} />
    </ContainerFilters>
  );
}

export default Filters;
