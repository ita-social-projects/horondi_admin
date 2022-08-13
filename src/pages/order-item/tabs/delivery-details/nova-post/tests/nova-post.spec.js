import React from 'react';
import { render, screen } from '@testing-library/react';
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

  it('should render errors for the fields, when validation fails for them', () => {
    render(
      <NovaPost
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
