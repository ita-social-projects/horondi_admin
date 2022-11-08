import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import { DatePicker } from 'rsuite';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import PromoCodeAdd from '../promo-code-add';
import { theme } from '../../../../components/app/app-theme/app.theme';
import { mocks } from '../../promo-code-form/test/promo-code-form.variables';

jest.mock('react-redux');

const dispatch = jest.fn();
const mockState = jest.fn();
const themeValue = theme('light');

useDispatch.mockImplementation(() => dispatch);

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (value) => [value, mockState]
}));

describe('PromoCodeAdd component tests', () => {
  let wrapper;
  beforeEach(async () => {
    wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <ThemeProvider theme={themeValue}>
            <PromoCodeAdd />
          </ThemeProvider>
        </BrowserRouter>
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    wrapper = null;
  });

  it('Should render PromoCodeAdd', () => {
    expect(wrapper).toBeDefined();
  });

  it('simulate onchange PromoCodeAdd code', async () => {
    const input = wrapper.find(TextField).at(0);
    input.props().onChange({ target: { value: 'firstTextField' } });
    expect(mockState).toHaveBeenCalled();
  });

  it('simulate onchange PromoCodeAdd code', async () => {
    const input = wrapper.find(TextField).at(1);
    input.props().onChange({ target: { value: 'secondTextField' } });
    expect(mockState).toHaveBeenCalled();
  });

  it('simulate onchange PromoCodeAdd DatePicker', async () => {
    const dataPicker = wrapper.find(DatePicker).at(0);
    dataPicker.props().onChange({ value: '14.01.2022' });
    expect(mockState).toHaveBeenCalled();
  });

  it('simulate onchange PromoCodeAdd DatePicker', async () => {
    const dataPicker = wrapper.find(DatePicker).at(1);
    dataPicker.props().onChange({ value: '29.12.2021' });
    expect(mockState).toHaveBeenCalled();
  });
});
