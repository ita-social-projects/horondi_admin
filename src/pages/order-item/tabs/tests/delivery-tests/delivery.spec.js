import React from 'react';
import { screen, render, within, fireEvent } from '@testing-library/react';
import Delivery from '../../delivery';
import { deliveryProps } from './delivery.variables';

const setFieldValue = jest.fn();

describe('tests for delivery component', () => {
  it('should render delivery component with worldwide fields', () => {
    render(
      <Delivery
        setFieldValue={setFieldValue}
        data={{ delivery: { ...deliveryProps, sentBy: 'WORLDWIDE' } }}
      />
    );

    const statesWrapper = screen.getByTestId('stateOrProvince');
    const statesInput = within(statesWrapper).getByRole('textbox');

    expect(statesInput).toHaveAttribute('disabled');
  });

  it('should render delivery component with ukrpost courier or novapost courier fields', () => {
    render(
      <Delivery
        setFieldValue={setFieldValue}
        data={{ delivery: { ...deliveryProps, sentBy: 'UKRPOSTCOURIER' } }}
      />
    );

    const cityInputWrapper = screen.getByTestId('delivery.courier.city');
    const cityInput = within(cityInputWrapper).getByRole('textbox');

    expect(cityInput).toBeInTheDocument();
  });
});
