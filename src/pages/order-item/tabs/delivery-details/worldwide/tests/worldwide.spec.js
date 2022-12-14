import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import Worldwide from '../worldwide';
import { props, inputOptions, errorInputOptions } from './worldwide.variables';

jest.mock('../../../../../../services/worldwide-delivery.service', () => ({
  getCountries: jest.fn().mockResolvedValue([]),
  getStatesByCountry: jest.fn().mockResolvedValue([]),
  getCitiesByCountryAndState: jest.fn().mockResolvedValue([])
}));

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

describe('tests for worldwide delivery component', () => {
  it('worldwide delivery component should be rendered correctly', () => {
    render(
      <Worldwide
        {...props}
        setFieldValue={setFieldValue}
        inputOptions={{ ...inputOptions, handleBlur }}
      />
    );

    const heading = screen.getByRole('heading', { level: 3 });

    const statesWrapper = screen.getByTestId('stateOrProvince');
    const statesInput = within(statesWrapper).getByRole('textbox');

    expect(heading).toBeInTheDocument();
    expect(statesInput).toHaveAttribute('disabled');
  });

  it('test typing in worldwideCity input', () => {
    render(
      <Worldwide
        {...props}
        values={{ worldWideCountry: 'Ukraine' }}
        setFieldValue={setFieldValue}
        inputOptions={{ ...inputOptions, handleBlur }}
      />
    );

    const citiesWrapper = screen.getByTestId('worldWideCity');
    const citiesInput = within(citiesWrapper).getByRole('textbox');

    fireEvent.change(citiesInput, { target: { value: 'city' } });
    expect(citiesInput).toHaveAttribute('value', 'city');
  });

  it('should show an error for the first field', () => {
    render(
      <Worldwide
        {...props}
        setFieldValue={setFieldValue}
        inputOptions={{ ...errorInputOptions, handleBlur }}
      />
    );
    const worldWideCountry = screen.getByTestId(
      'delivery.worldWide.worldWideCountry'
    );
    expect(worldWideCountry).toHaveTextContent('Поле не може бути порожнім');
  });

  it('should not show errors except the first field', () => {
    render(
      <Worldwide
        {...props}
        setFieldValue={setFieldValue}
        inputOptions={{ ...errorInputOptions, handleBlur }}
      />
    );
    const stateOrProvince = screen.getByTestId(
      'delivery.worldWide.stateOrProvince'
    );
    const worldWideCity = screen.getByTestId(
      'delivery.worldWide.worldWideCity'
    );
    expect(stateOrProvince).not.toHaveTextContent('Поле не може бути порожнім');
    expect(worldWideCity).not.toHaveTextContent('Поле не може бути порожнім');
  });
});

describe('tests for worldwide delivery component with selected values', () => {
  beforeEach(() => {
    render(
      <Worldwide
        {...props}
        setFieldValue={setFieldValue}
        inputOptions={{ ...errorInputOptions, handleBlur }}
      />
    );
    const autocomplete = screen.getByTestId('worldWideCountry');
    const input = within(autocomplete).getByRole('textbox');
    autocomplete.focus();
    fireEvent.change(input, { target: { value: 'Київ' } });

    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
    fireEvent.keyDown(autocomplete, { key: 'Enter' });
  });

  it('input should have value Київ"', () => {
    const productsField = screen
      .getByTestId('worldWideCountry')
      .querySelector('input');

    expect(productsField.value).toEqual('Київ');
  });

  it('input should be empty', () => {
    const autocomplete = screen.getByTestId('worldWideCountry');
    const productsField = screen
      .getByTestId('worldWideCountry')
      .querySelector('input');
    const input = within(autocomplete).getByRole('textbox');
    const value = '';
    fireEvent.change(input, { target: { value } });
    expect(productsField.value).toEqual(value);
  });

  it('Select sould show Telegram', () => {
    const select = screen.getByTestId('select');
    fireEvent.click(select);
    fireEvent.keyDown(select, { key: 'ArrowDown' });
    fireEvent.keyDown(select, { key: 'Enter' });

    const messanger = screen.getByTestId('select').querySelector('input');
    fireEvent.change(messanger, { target: { value: 'Telegram' } });

    expect(messanger.value).toEqual('Telegram');
  });
});
