import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import UkrPost from '../ukrpost';
import { props, inputOptions, errorInputOptions } from './ukrpost.variables';

jest.mock('react-redux');

document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  }
});

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

describe('tests for the UkrPost component', () => {
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

  it('should not show errors except the first field', () => {
    render(
      <UkrPost
        {...props}
        setFieldValue={setFieldValue}
        inputOptions={{ ...errorInputOptions, handleBlur }}
      />
    );
    const district = screen.getByTestId('delivery.ukrPost.district');
    const city = screen.getByTestId('delivery.ukrPost.city');
    expect(district).not.toHaveTextContent('Поле не може бути порожнім');
    expect(city).not.toHaveTextContent('Поле не може бути порожнім');
  });
});

describe('tests for ukrpost delivery component with selected values', () => {
  beforeEach(() => {
    render(
      <UkrPost
        {...props}
        setFieldValue={setFieldValue}
        inputOptions={{ ...inputOptions, handleBlur }}
      />
    );
    const autocomplete = screen.getByTestId('regionUkrPost');
    const input = within(autocomplete).getByRole('textbox');
    autocomplete.focus();
    fireEvent.change(input, { target: { value: 'Київ' } });

    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
    fireEvent.keyDown(autocomplete, { key: 'Enter' });
  });

  it('input should have value Київ"', () => {
    const productsField = screen
      .getByTestId('regionUkrPost')
      .querySelector('input');

    expect(productsField.value).toEqual('Київ');
  });

  it('input should be empty', () => {
    const autocomplete = screen.getByTestId('regionUkrPost');
    const productsField = screen
      .getByTestId('regionUkrPost')
      .querySelector('input');
    const input = within(autocomplete).getByRole('textbox');
    const value = '';
    fireEvent.change(input, { target: { value } });
    expect(productsField.value).toEqual(value);
  });
});
