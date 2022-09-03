import React from 'react';
import * as redux from 'react-redux';
import { fireEvent, render, screen, act } from '@testing-library/react';
import AutoCompleteOptions from '../autocomplete-options';
import {
  autocompleteLabels,
  mockPositions,
  mockTouched,
  mockValues,
  onChangeArg
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

  test('Should render AutocompleteOptions', async () => {
    const autocomplete = screen.getByRole('textbox');
    act(() => {
      fireEvent.mouseDown(autocomplete);
    });

    const option = screen.getByText('Ліворуч');
    act(() => {
      fireEvent.click(option);
    });

    expect(mockSetFieldValue).toHaveBeenCalledWith(...onChangeArg);
  });
});
