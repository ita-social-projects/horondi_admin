import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';

import PromoCodeEdit from '../promo-code-edit';
import { mocks } from './promo-code-edit.variables';

jest.mock('react-redux');
const dispatch = jest.fn();
useDispatch.mockImplementation(() => dispatch);

jest.mock('@apollo/client');
const useQueryData = {
  data: mocks
};

const updatePromoCodeHandler = jest.fn();
useMutation.mockImplementation((query, options) => {
  options.onCompleted();
  return [updatePromoCodeHandler];
});

describe('PromoCodePage component test with loading', () => {
  useQuery.mockImplementation(() => ({
    ...useQueryData,
    loading: true
  }));
  render(
    <BrowserRouter>
      <PromoCodeEdit />
    </BrowserRouter>
  );
  it('test Loader in PromoCodeEdit component', () => {
    const loader = screen.queryByRole(/'progressbar'/i);

    expect(loader).toBeDefined();
  });
});

describe('edit loading', () => {
  beforeEach(() => {
    useQuery.mockImplementation(() => ({
      ...useQueryData,
      loading: false
    }));
    render(
      <BrowserRouter>
        <PromoCodeEdit />
      </BrowserRouter>
    );
    screen.debug();
  });

  it('should change promocode code name', () => {
    const input = screen.getByDisplayValue(/testttttt/i);

    fireEvent.change(input, { target: { value: 'TEST' } });
    expect(input.value).toEqual('TEST');
  });

  it('should render dateFrom', () => {
    const input = screen.getByText(/2022-01-29/i);

    expect(input).toBeInTheDocument();
  });

  it('should change promocode discount', () => {
    const input = screen.getByDisplayValue(/10/i);

    fireEvent.change(input, { target: { value: '5' } });
    expect(input.value).toEqual('5');
  });

  it('should render dateTo text', () => {
    const text = screen.queryByText(/Термін дії:/i);

    expect(text).toBeInTheDocument();
  });
});
