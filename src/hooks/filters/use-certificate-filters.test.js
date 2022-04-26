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
  it('should call useS ateSpy', () => {
    const { searchOptions, clearOptions, sortOptions } =
      useCertificateFilters();

    searchOptions.setSearchFilter('name');
    sortOptions.setSorting('value', 'asc', 'sortByPriceAsc');
    clearOptions.clearAllFilters();

    expect(useStateSpy).toHaveBeenCalled();
  });
});
