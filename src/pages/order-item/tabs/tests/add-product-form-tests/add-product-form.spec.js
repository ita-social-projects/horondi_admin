import React from 'react';
import { screen, render, fireEvent, within } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';
import AddProductForm from '../../add-product-form/add-product-form';
import {
  mockProduct,
  mockSize,
  mockItems,
  mocksQuery
} from './add-product-form.variables';

jest.mock('react-redux');
jest.mock('../../../../../utils/order');

const mockSetFieldValue = jest.fn();
const dispatch = jest.fn();
const RolltopYellow = 'Роллтоп жовтий';

useDispatch.mockImplementation(() => dispatch);
useSelector.mockImplementation(() => ({
  products: mockProduct,
  loading: false,
  sizes: mockSize,
  category: null
}));

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  }
});

describe('tests for add-product-form component', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <AddProductForm
          items={mockItems}
          setFieldValue={mockSetFieldValue}
          setSizeItems={jest.fn()}
          setPricesWithDiscount={jest.fn()}
          promoCode={{}}
          setDiscounts={jest.fn()}
        />
      </MockedProvider>
    );

    const autocomplete = screen.getByTestId('autocomplete');
    const input = within(autocomplete).getByRole('textbox');
    autocomplete.focus();
    fireEvent.change(input, { target: { value: 'Ролл' } });

    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
    fireEvent.keyDown(autocomplete, { key: 'Enter' });
  });

  it(' input should have value "Роллтоп жовтий"', () => {
    const productsField = screen
      .getByTestId('autocomplete')
      .querySelector('input');

    expect(productsField.value).toEqual(RolltopYellow);
  });

  it('input should be empty', () => {
    const autocomplete = screen.getByTestId('autocomplete');
    const productsField = screen
      .getByTestId('autocomplete')
      .querySelector('input');
    const input = within(autocomplete).getByRole('textbox');
    const value = '';
    fireEvent.change(input, { target: { value } });
    expect(productsField.value).toEqual(value);
  });

  it('should increment and decrement quantity product', () => {
    const increment = screen.getByTestId('increment');
    const decrement = screen.getByTestId('decrement');
    const quantity = screen.getByTestId('quantity');

    fireEvent.click(increment);
    fireEvent.click(increment);
    fireEvent.click(decrement);

    expect(increment).toHaveProperty('disabled', false);
    expect(quantity).toHaveTextContent('2');
  });

  it('should add Product', () => {
    const addBtn = screen.getByTestId('add-btn');

    fireEvent.click(addBtn);

    expect(addBtn).toHaveProperty('disabled', false);
    expect(mockSetFieldValue).toHaveBeenCalledTimes(1);
  });
  it('shoud handle change in input', () => {
    const input = screen.getByTestId('promo-input');
    const value = 'wallet';
    fireEvent.change(input, { target: { value } });
    expect(input).toHaveValue(value);
  });
  it('clear input after checking promoCode', async () => {
    const input = screen.getByTestId('promo-input');
    const value = 'wallet';
    const button = screen.getByTestId('promo-button');
    fireEvent.change(input, { target: { value } });
    fireEvent.click(button);

    expect(await screen.findByTestId('promo-input')).toHaveValue('');
  });
});
