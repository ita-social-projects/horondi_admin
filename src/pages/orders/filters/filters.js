import React from 'react';
import { useSelector } from 'react-redux';
import ComponentFilterDateRangePicker from '../../../components/filters-components/filter-date-range-picker';
import ComponentFilterSinglePicker from '../../../components/filters-components/filter-single-picker';
import ComponentFilterMultiplePicker from '../../../components/filters-components/filter-multiple-picker';
import filterLabels from '../../../configs/filter-labels';
import ContainerFilters from '../../../components/container-filters';
import ComponentFilterClear from '../../../components/filters-components/filter-clear';
import {
  clearOrderFilters,
  setOrderFilter,
  setOrderSort,
  setOrderSortLabel
} from '../../../redux/orders/orders.actions';
import { sortLabel } from '../../../configs/sort';
import buttonTitles from '../../../configs/button-titles';
import { paymentStatusFilterObj } from '../../../utils/order';
import { config } from '../../../configs';
import ComponentFilterSearch from '../../../components/filters-components/filter-search';

function Filters() {
  const { filters, sortLabel: sortValue } = useSelector(({ Orders }) => Orders);

  const paymentOptions = [...paymentStatusFilterObj()];

  const { dateFrom, dateTo } = filters;

  return (
    <ContainerFilters>
      <ComponentFilterDateRangePicker
        setFilterValue={setOrderFilter}
        filters={{ dateFrom, dateTo }}
      />

      <ComponentFilterSinglePicker
        setFilterValue={setOrderSort}
        actionSetLabel={setOrderSortLabel}
        value={sortValue}
        options={filterLabels.orders.sortLabels}
        label={sortLabel}
      />

      <ComponentFilterMultiplePicker
        setFilterValue={setOrderFilter}
        selectorFunc={(selector) => ({ paymentStatus: selector })}
        value={filters.paymentStatus}
        options={paymentOptions}
        label={buttonTitles.PAYMENT_STATUS}
      />

      <ComponentFilterMultiplePicker
        setFilterValue={setOrderFilter}
        selectorFunc={(selector) => ({ status: selector })}
        value={filters.status}
        options={config.labels.orders.select}
        label={buttonTitles.ORDER_STATUS}
      />

      <ComponentFilterSearch
        setFilterValue={setOrderFilter}
        value={filters.search}
        selectorFunc={(selector) => ({ search: selector })}
      />

      <ComponentFilterClear actionClearFilters={clearOrderFilters} />
    </ContainerFilters>
  );
}

export default Filters;
