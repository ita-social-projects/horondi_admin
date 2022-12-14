import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import NovaPost from '../nova-post';
import { props, inputOptions, errorInputOptions } from './nova-post.variables';

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
  cities: [],
  warehouses: []
}));

describe('tests for the NovaPost component', () => {
  it('renders the NovaPost component correctly', () => {
    render(
      <NovaPost
        {...props}
        setFieldValue={setFieldValue}
        inputOptions={{ ...inputOptions, handleBlur }}
      />
    );

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
  });

  it('should show an error for the first field', () => {
    render(
      <NovaPost
        {...props}
        setFieldValue={setFieldValue}
        inputOptions={{ ...errorInputOptions, handleBlur }}
      />
    );

    const city = screen.getByTestId('delivery.novaPost.city');
    expect(city).toHaveTextContent('Поле не може бути порожнім');
  });

  it('should not show an error for the second field', () => {
    render(
      <NovaPost
        {...props}
        setFieldValue={setFieldValue}
        inputOptions={{ ...errorInputOptions, handleBlur }}
      />
    );

    const courierOffice = screen.getByTestId('delivery.novaPost.courierOffice');
    expect(courierOffice).not.toHaveTextContent('Поле не може бути порожнім');
  });
});

describe('tests for NovaPost delivery component with selected values', () => {
  beforeEach(() => {
    render(
      <NovaPost
        {...props}
        setFieldValue={setFieldValue}
        inputOptions={{ ...errorInputOptions, handleBlur }}
      />
    );
    const autocomplete = screen.getByTestId('cityNovaPost');
    const input = within(autocomplete).getByRole('textbox');
    autocomplete.focus();
    fireEvent.change(input, { target: { value: 'Київ' } });

    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
    fireEvent.keyDown(autocomplete, { key: 'Enter' });
  });

  it('input should have value Київ"', () => {
    const productsField = screen
      .getByTestId('cityNovaPost')
      .querySelector('input');

    expect(productsField.value).toEqual('Київ');
  });

  it('input should be empty', () => {
    const autocomplete = screen.getByTestId('cityNovaPost');
    const productsField = screen
      .getByTestId('cityNovaPost')
      .querySelector('input');
    const input = within(autocomplete).getByRole('textbox');
    const value = '';
    fireEvent.change(input, { target: { value } });
    expect(productsField.value).toEqual(value);
  });
});
