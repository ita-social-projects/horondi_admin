import React from 'react';
import {
  render,
  screen,
  within,
  fireEvent,
  getByRole
} from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
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
