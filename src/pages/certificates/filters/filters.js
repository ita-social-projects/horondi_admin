import React from 'react';
import { useSelector } from 'react-redux';
import ContainerFilters from '../../../components/container-filters';
import ComponentFilterClear from '../../../components/filters-components/filter-clear';
import ComponentFilterSearch from '../../../components/filters-components/filter-search';
import ComponentFilterMultiplePicker from '../../../components/filters-components/filter-multiple-picker';
import {
  clearFilters,
  setCertificateFilter
} from '../../../redux/certificates/certificates.actions';
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

const Filters = () => {
  const { filters } = useSelector(({ Certificates }) => Certificates);

  return (
    <ContainerFilters>
      <ComponentFilterMultiplePicker
        setFilterValue={setCertificateFilter}
        selectorFunc={(selector) => ({ value: selector })}
        value={filters.value}
        options={availablePrice}
        label={buttonTitles.PRICE}
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
      <ComponentFilterClear actionClearFilters={clearFilters} />
    </ContainerFilters>
  );
};

export default Filters;
