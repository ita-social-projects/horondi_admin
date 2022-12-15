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
