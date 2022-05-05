import React from 'react';
import { useDispatch } from 'react-redux';
import useCertificateFilters from './use-certificate-filters';

jest.mock('react-redux');
const dispatch = jest.fn();
useDispatch.mockImplementation(() => dispatch);

const setState = jest.fn();
const useStateSpy = jest
  .spyOn(React, 'useState')
  .mockImplementation((init) => [init, setState]);

describe('use-certificate-filters test', () => {
  it('should call useStateSpy', () => {
    const {
      searchOptions,
      clearOptions,
      sortOptions,
      filterByMultipleOptions
    } = useCertificateFilters();

    searchOptions.setSearchFilter('name');
    sortOptions.setSorting('value', 'asc', 'sortByPriceAsc');
    clearOptions.clearAllFilters();
    filterByMultipleOptions[0].setFilterHandler('isActivated');

    expect(useStateSpy).toHaveBeenCalled();
  });
});
