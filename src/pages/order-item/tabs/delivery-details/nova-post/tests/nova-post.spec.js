import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import NovaPost from '../nova-post';
import { props, inputOptions, errorInputOptions } from './nova-post.variables';

jest.mock('react-redux');

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
