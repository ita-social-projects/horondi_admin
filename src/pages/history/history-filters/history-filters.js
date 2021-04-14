import React from 'react';

import { useStyles } from './history-filters.styles';
import FilterByDate from './filter-by-date';
import FilterByMultipleValues from './filter-by-miltiple-values';
import buttonTitles from '../../../configs/button-titles';
import {
  actionFilterObj,
  filterInputToRender,
  roleFilterObject,
  userRolesForFilter
} from '../../../utils/history';
import { historyActions } from '../../../consts/history-actions';
import FilterNavbar from '../../../components/filter-search-sort';
import titles from '../../../configs/titles';

const HistoryFilters = (
  {
    clearOptions,
    searchOptions,
    filters,
    filterOptions
  }
) => {
  const styles = useStyles();

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.filterItems}>
        <div className={styles.filterByDate}>
          <FilterByDate
            title={titles.historyTitles.from}
            filters={filters.dateFrom}
            setDateRangeFilter={filterOptions.setDateFromRangeFilter}
          />
          <FilterByDate
            title={titles.historyTitles.to}
            filters={filters.dateTo}
            setDateRangeFilter={filterOptions.setDateToRangeFilter}
          />
        </div>
        <FilterByMultipleValues
          className={styles.filterItem}
          filters={filters.action}
          filterItem={filterOptions.actionItem}
          setFilterItem={filterOptions.setActionItem}
          label={buttonTitles.EVENT_TITLE}
          selectItems={actionFilterObj()}
          setFilterHandler={filterOptions.setActionsFilter}
          renderFilterItems={filterInputToRender}
          objForTranslateRenderItems={historyActions}
        />

        <FilterByMultipleValues
          filters={filters.role}
          filterItem={filterOptions.roleItem}
          setFilterItem={filterOptions.setRoleItem}
          label={buttonTitles.USER_ROLE_TITLE}
          selectItems={roleFilterObject}
          setFilterHandler={filterOptions.setRolesFilter}
          renderFilterItems={filterInputToRender}
          objForTranslateRenderItems={userRolesForFilter}
        />
      </div>
      <div className={styles.filterNavbar}>
        <FilterNavbar options={{ clearOptions, searchOptions } || {}}/>
      </div>
    </div>
  );
};

export default HistoryFilters;
