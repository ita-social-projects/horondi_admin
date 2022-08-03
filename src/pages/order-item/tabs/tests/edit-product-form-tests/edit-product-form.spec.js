import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  mockSize,
  mockItems,
  mockItemsPriceWithDiscount
} from './edit-product-form.variables';
import EditProductForm from '../../edit-product-form/edit-product-form';

jest.mock('react-redux');

const mockSetFieldValue = jest.fn();
const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);
useSelector.mockImplementation(() => ({ sizes: mockSize, category: null }));

describe('tests for edit-product-form component', () => {
  beforeEach(() => {
    render(
      <EditProductForm
        open
        onCloseHandler={jest.fn()}
        selectedItem={mockItems[0]}
        items={mockItems}
        setFieldValue={mockSetFieldValue}
        setSizeItems={jest.fn()}
        itemsPriceWithDiscount={mockItemsPriceWithDiscount}
        promoCode={{}}
      />
    );
  });

  it('render btn increment', () => {
    const increment = screen.getByTestId('increment');
    const quantity = screen.getByTestId('quantity');

    fireEvent.click(increment);

    expect(quantity).toHaveTextContent('4');
  });

  it('should be saved changes ', () => {
    const decrement = screen.getByTestId('decrement');
    const quantity = screen.getByTestId('quantity');
    const saveBtn = screen.getByTestId('save-btn');

    fireEvent.click(decrement);
    fireEvent.click(saveBtn);

    expect(mockSetFieldValue).toHaveBeenCalledTimes(2);
    expect(quantity).toHaveTextContent('2');
  });
});
