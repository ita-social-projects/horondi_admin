import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { TextField } from '@material-ui/core';
import { DatePicker } from 'rsuite';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import PromoCodeAdd from '../promo-code-add';
import { theme } from '../../../../components/app/app-theme/app.theme';

jest.mock('react-redux');
jest.mock('@apollo/client');

const dispatch = jest.fn();
const mockMutation = jest.fn();
const mockState = jest.fn();
const themeValue = theme('light');

useDispatch.mockImplementation(() => dispatch);
useMutation.mockImplementation((query, options) => {
  options.onCompleted();
  return [mockMutation];
});

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (value) => [value, mockState]
}));

let wrapper;

describe('PromoCodeAdd component tests', () => {
  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <ThemeProvider theme={themeValue}>
          <PromoCodeAdd />
        </ThemeProvider>
      </BrowserRouter>
    );
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
    expect(dispatch).toHaveBeenCalled();
  });
});
