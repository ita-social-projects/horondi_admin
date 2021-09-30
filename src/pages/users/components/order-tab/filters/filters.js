import React from 'react';
import { useSelector } from 'react-redux';
import ContainerFilters from '../../../../../components/container-filters';
import ComponentFilterClear from '../../../../../components/filters-components/filter-clear';
import ComponentFilterDateRangePicker from '../../../../../components/filters-components/filter-date-range-picker';
import ComponentFilterSinglePicker from '../../../../../components/filters-components/filter-single-picker';
import filterLabels from '../../../../../configs/filter-labels';
import {
  clearOrderFiltersUser,
  setOrderFilterUser,
  setOrderSort,
  setOrderSortLabel
} from '../../../../../redux/orders/orders.actions';
import { sortLabel as labelSort } from '../../../../../configs/sort';
import buttonTitles from '../../../../../configs/button-titles';
import ComponentFilterMultiplePicker from '../../../../../components/filters-components/filter-multiple-picker';
import { paymentStatusFilterObj } from '../../../../../utils/order';
import { config } from '../../../../../configs';
import ComponentFilterSearch from '../../../../../components/filters-components/filter-search';

function Filters() {
  const { filtersUser: filters, sortLabel } = useSelector(
    ({ Orders }) => Orders
  );
  const paymentOptions = [...paymentStatusFilterObj()];

  const paymentStatusSelector = (selector) => ({ paymentStatus: selector });
  const statusSelector = (selector) => ({ status: selector });
  const searchSelector = (selector) => ({ search: selector });

  return (
    <ContainerFilters>
      <ComponentFilterDateRangePicker
        setFilterValue={setOrderFilterUser}
        filters={filters}
      />
      <ComponentFilterSinglePicker
        setFilterValue={setOrderSort}
        actionSetLabel={setOrderSortLabel}
        value={sortLabel}
        options={filterLabels.orders.sortLabels}
        label={labelSort}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setOrderFilterUser}
        selectorFunc={paymentStatusSelector}
        value={filters.paymentStatus}
        options={paymentOptions}
        label={buttonTitles.PAYMENT_STATUS}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setOrderFilterUser}
        selectorFunc={statusSelector}
        value={filters.status}
        options={config.labels.orders.select}
        label={buttonTitles.ORDER_STATUS}
      />
      <ComponentFilterSearch
        setFilterValue={setOrderFilterUser}
        value={filters.search}
        selectorFunc={searchSelector}
      />
      <ComponentFilterClear actionClearFilters={clearOrderFiltersUser} />
    </ContainerFilters>
  );
}

export default Filters;
