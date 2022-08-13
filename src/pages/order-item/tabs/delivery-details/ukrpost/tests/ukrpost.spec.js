import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import UkrPost from '../ukrpost';
import { props, inputOptions, errorInputOptions } from './ukrpost.variables';

jest.mock('react-redux');

const setFieldValue = jest.fn();
const handleBlur = jest.fn();
const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);
useSelector.mockImplementation(() => ({
  deliveryLoading: false,
  ukrPoshtaCities: [],
  ukrPoshtaRegions: [],
  ukrPoshtaDistricts: [],
  ukrPoshtaPostOffices: []
}));

describe('tests for worldwide delivery component', () => {
  it('renders the UkrPost component correctly', () => {
    render(
      <UkrPost
        {...props}
        setFieldValue={setFieldValue}
        inputOptions={{ ...inputOptions, handleBlur }}
      />
    );

    const heading = screen.getByRole('heading', { level: 3 });

    expect(heading).toBeInTheDocument();
  });

  it('should render errors for the fields, when validation fails for them', () => {
    render(
      <UkrPost
        {...props}
        setFieldValue={setFieldValue}
        inputOptions={{ ...errorInputOptions, handleBlur }}
      />
    );
    const fields = Object.entries(errorInputOptions.errors);
    fields.forEach(([field, value]) => {
      const fieldElement = screen.getByTestId(field);
      expect(fieldElement).toHaveTextContent(value);
    });
  });
});
