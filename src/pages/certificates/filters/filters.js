import React from 'react';
import ContainerFilters from '../../../components/container-filters';
import ComponentFilterClear from '../../../components/filters-components/filter-clear';
import ComponentFilterSearch from '../../../components/filters-components/filter-search';
import ComponentFilterMultiplePicker from '../../../components/filters-components/filter-multiple-picker';

const Filters = () => {
  const availablePrice = [
    {
      value: 0,
      label: 500
    },
    {
      value: 1,
      label: 1000
    },
    {
      value: 2,
      label: 1500
    }
  ];
  const availableStatus = [
    {
      value: 0,
      label: 'Активний'
    },
    {
      value: 1,
      label: 'Використаний'
    },
    {
      value: 2,
      label: 'Прострочений'
    }
  ];

  return (
    <ContainerFilters>
      <ComponentFilterMultiplePicker
        setFilterValue={() => {}}
        selectorFunc={() => {}}
        options={availablePrice}
        label='Вартість'
      />
      <ComponentFilterMultiplePicker
        setFilterValue={() => {}}
        selectorFunc={() => {}}
        options={availableStatus}
        label='Статус'
      />
      <ComponentFilterSearch
        setFilterValue={() => {}}
        selectorFunc={() => {}}
      />
      <ComponentFilterClear actionClearFilters={() => {}} />
    </ContainerFilters>
  );
};

export default Filters;
