import React from 'react';
import { screen, render, fireEvent, within } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import AddProductForm from '../../add-product-form/add-product-form';
import { mockProduct, mockSize, mockItems } from './add-product-form.variables';

jest.mock('react-redux');

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
      <AddProductForm
        items={mockItems}
        setFieldValue={mockSetFieldValue}
        setSizeItems={jest.fn()}
        setPricesWithDiscount={jest.fn()}
        promoCode={{}}
        setDiscounts={jest.fn()}
      />
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
});
