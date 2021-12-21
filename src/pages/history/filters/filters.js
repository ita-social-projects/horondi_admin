import React from 'react';
import { useSelector } from 'react-redux';
import ContainerFilters from '../../../components/container-filters';
import ComponentFilterClear from '../../../components/filters-components/filter-clear';
import ComponentFilterDateRangePicker from '../../../components/filters-components/filter-date-range-picker';
import ComponentFilterMultiplePicker from '../../../components/filters-components/filter-multiple-picker';
import buttonTitles from '../../../configs/button-titles';
import {
  clearHistoryFilters,
  setHistoryFilter
} from '../../../redux/history/history.actions';
import {
  historyEventFilterObj,
  roleFilterObject
} from '../../../utils/history';
import ComponentFilterSearch from '../../../components/filters-components/filter-search';
import { historyEvents } from '../../../consts/history-events';

function Filters() {
  const { filters } = useSelector(({ History }) => History);

  const actionOptions = [...historyEventFilterObj(historyEvents.historyAction)];
  const nameOptions = [...historyEventFilterObj(historyEvents.historyName)];

  return (
    <ContainerFilters>
      <ComponentFilterDateRangePicker
        setFilterValue={setHistoryFilter}
        filters={filters}
      />

      <ComponentFilterMultiplePicker
        setFilterValue={setHistoryFilter}
        selectorFunc={(selector) => ({ action: selector })}
        value={filters.action}
        options={actionOptions}
        label={buttonTitles.HISTORY_ACTION}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setHistoryFilter}
        selectorFunc={(selector) => ({ historyName: selector })}
        value={filters.historyName}
        options={nameOptions}
        label={buttonTitles.HISTORY_NAME}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={setHistoryFilter}
        selectorFunc={(selector) => ({ role: selector })}
        value={filters.role}
        options={roleFilterObject}
        label={buttonTitles.USER_ROLE_TITLE}
      />
      <ComponentFilterSearch
        setFilterValue={setHistoryFilter}
        value={filters.search}
        selectorFunc={(selector) => ({ search: selector })}
      />
      <ComponentFilterClear actionClearFilters={clearHistoryFilters} />
    </ContainerFilters>
  );
}

export default Filters;
