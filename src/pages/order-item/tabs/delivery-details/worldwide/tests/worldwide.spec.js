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

  it('should show an error for the field', () => {
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
    const messengerPhone = screen.getByTestId(
      'delivery.worldWide.messengerPhone'
    );
    expect(worldWideCountry).toHaveTextContent('Поле не може бути порожнім');
    expect(messengerPhone).toHaveTextContent('Поле не може бути порожнім');
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
    const worldWideStreet = screen.getByTestId(
      'delivery.worldWide.worldWideStreet'
    );
    const cityCode = screen.getByTestId('delivery.worldWide.cityCode');

    expect(stateOrProvince).not.toHaveTextContent('Поле не може бути порожнім');
    expect(worldWideCity).not.toHaveTextContent('Поле не може бути порожнім');
    expect(worldWideStreet).not.toHaveTextContent('Поле не може бути порожнім');
    expect(cityCode).not.toHaveTextContent('Поле не може бути порожнім');
  });
});
