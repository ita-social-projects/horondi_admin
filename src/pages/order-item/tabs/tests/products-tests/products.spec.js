import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';
import Products from '../../products';
import { getPromoCodeMock, mockData, mockSizes } from './products.variables';
import { editProductFormPropTypes } from '../../../../utils/order';

jest.mock('react-redux');
let mockEditProductForm;
jest.mock('../../edit-product-form/edit-product-form', () => ({
    __esModule: true,
    default: function mockEditProductForm({
      onCloseHandler,
      open,
      setSizeItems
    }) {
      const sizes = setSizeItems(mockSizes);
      return (
        <>
          {open && (
            <div data-testid='close-button' onClick={onCloseHandler} />
          )}
          {open && <div data-testid='set-sizes'>{sizes}</div>}
        </>
      );
    }
  }));
mockEditProductForm.propTypes = editProductFormPropTypes;

const mockSetFieldValue = jest.fn();
const dispatch = jest.fn();
const BagShopper = 'Сумка шопер';
let wrapper;

useDispatch.mockImplementation(() => dispatch);
useSelector.mockImplementation(() => ({
  products: [],
  loading: false,
  sizes: null,
  category: null
}));

describe('tests for Products component', () => {
  beforeEach(() => {
    wrapper = render(
      <MockedProvider mocks={getPromoCodeMock}>
        <Products data={mockData} setFieldValue={mockSetFieldValue} />
      </MockedProvider>
    );
  });

  it('should render Products component', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render product Bag shopper', () => {
    const item = screen.getByText(BagShopper);

    expect(item).toBeDefined();
  });
  it('shoud open dialog window for editing product', () => {
    const editBtn = wrapper.getByTestId('edit_btn');
    fireEvent.click(editBtn);
    expect(screen.getByTestId('close-button')).toBeInTheDocument();
  });
  it('shoud close dialog window for editing product', () => {
    const editBtn = wrapper.getByTestId('edit_btn');
    fireEvent.click(editBtn);
    const closeBtn = screen.queryByTestId('close-button');
    fireEvent.click(closeBtn);
    expect(closeBtn).not.toBeInTheDocument();
  });
  it('should change size', () => {
    const editBtn = wrapper.getByTestId('edit_btn');
    fireEvent.click(editBtn);
    expect(screen.getAllByTestId('size-item').length).toBe(3);
  });
});
