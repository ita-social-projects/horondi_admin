import React from 'react';
import * as redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import AutoCompleteOptions from '../autocomplete-options';
import {
  autocompleteLabels,
  mockPositions,
  mockTouched,
  mockValues
} from './autocomplete-options.variables';

const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
mockUseDispatch.mockImplementation(() => jest.fn());
const mockUseSelector = jest.spyOn(redux, 'useSelector');
mockUseSelector.mockReturnValue({ ...mockPositions });

const mockSetFieldValue = jest.fn();

describe('Autocomplete options test', () => {
  beforeEach(() => {
    render(
      <AutoCompleteOptions
        autocompleteLabels={autocompleteLabels}
        values={mockValues}
        touched={mockTouched}
        setFieldValue={mockSetFieldValue}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render AutocompleteOptions', () => {
    const autocomplete = screen.getByRole('textbox');
    expect(autocomplete).toBeInTheDocument();
  });
});
