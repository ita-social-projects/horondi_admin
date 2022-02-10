import React from 'react';

import ContainerFilters from '../../../components/container-filters';
import ComponentFilterClear from '../../../components/filters-components/filter-clear';
import ComponentFilterSearch from '../../../components/filters-components/filter-search';
import ComponentFilterMultiplePicker from '../../../components/filters-components/filter-multiple-picker';
import buttonTitles from '../../../configs/button-titles';

const availablePrice = [
  {
    value: '500',
    label: '500'
  },
  {
    value: '1000',
    label: '1000'
  },
  {
    value: '1500',
    label: '1500'
  }
];
const availableStatus = [
  {
    value: '0',
    label: 'Активний'
  },
  {
    value: '1',
    label: 'Використаний'
  },
  {
    value: '2',
    label: 'Прострочений'
  }
];

const Filters = () => (
    <ContainerFilters>
      <ComponentFilterMultiplePicker
        setFilterValue={() => {}}
        selectorFunc={() => {}}
        options={availablePrice}
        label={buttonTitles.PRICE}
      />
      <ComponentFilterMultiplePicker
        setFilterValue={() => {}}
        selectorFunc={() => {}}
        options={availableStatus}
        label={buttonTitles.STATUS}
      />
      <ComponentFilterSearch
        setFilterValue={() => {}}
        selectorFunc={() => {}}
      />
      <ComponentFilterClear actionClearFilters={() => {}} />
    </ContainerFilters>
  );

export default Filters;
