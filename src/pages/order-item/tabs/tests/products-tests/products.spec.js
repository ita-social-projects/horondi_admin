import React from 'react';
import { screen, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';
import Products from '../../products';
import { getPromoCodeMock, mockData } from './products.variables';

jest.mock('react-redux');

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
});
