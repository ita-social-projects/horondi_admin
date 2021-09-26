import React from 'react';
import { useSelector } from 'react-redux';
import ContainerFilters from '../../../../components/container-filters';
import ComponentFilterClear from '../../../../components/filters-components/filter-clear';
import ComponentFilterSinglePicker from '../../../../components/filters-components/filter-single-picker';
import ComponentFilterMultiplePicker from '../../../../components/filters-components/filter-multiple-picker';
import filterLabels from '../../../../configs/filter-labels';
import {
  clearFilters,
  setFilter,
  setSort,
  setUserSortLabel
} from '../../../../redux/users/users.actions';
import { sortLabel } from '../../../../configs/sort';
import buttonTitles from '../../../../configs/button-titles';
import { userStatusFilterObj } from '../../../../utils/user';
import ComponentFilterSearch from '../../../../components/filters-components/filter-search';

function UsersFilters() {
  const { filters, sortLabel: sortValue } = useSelector(({ Users }) => Users);
  const userStatusOptions = [...userStatusFilterObj()];
  return (
    <ContainerFilters>
      <ComponentFilterSinglePicker
        setFilterValue={setSort}
        actionSetLabel={setUserSortLabel}
        value={sortValue}
        options={filterLabels.orders.users}
        label={sortLabel}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setFilter}
        selectorFunc={(selector) => ({ banned: selector })}
        value={filters.banned}
        options={userStatusOptions}
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

export default UsersFilters;
