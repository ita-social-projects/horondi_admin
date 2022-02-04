import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { useDispatch } from 'react-redux';
import { createMemoryHistory } from 'history';

import PromoCodeEdit from '../promo-code-edit';
import { mocks } from './promo-code-edit.variables';

jest.mock('react-redux');

jest.mock('../../../../services/local-storage.service', () => ({
  getFromLocalStorage: jest.fn()
}));

const mockHistoryPush = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    id: '61f3ca58fb37d558e8bba8de'
  }),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));
const history = createMemoryHistory();

const dispatch = jest.fn();
useDispatch.mockImplementation(() => dispatch);

describe('edit loading', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>
          <PromoCodeEdit />
        </Router>
      </MockedProvider>
    );
  });

  it('should change promocode code name', async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    screen.debug();
    const input = screen.getByDisplayValue(/testttttt/i);
    fireEvent.change(input, { target: { value: 'TEST' } });
    expect(input.value).toEqual('TEST');
  });

  it('should render dateFrom', async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));

    const input = screen.getByText(/2022-02-09/i);
    expect(input).toBeInTheDocument();
  });

  it('should change promocode discount', async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));

    const input = screen.getByDisplayValue(/15/i);
    fireEvent.change(input, { target: { value: '5' } });
    expect(input.value).toEqual('5');
  });

  it('should render dateTo text', async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));

    const text = screen.queryByText(/Термін дії:/i);
    expect(text).toBeInTheDocument();
  });

  it('back button', async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    const backButton = screen.getByText(/Назад/i);

    // userEvent.click(backButton);
    // expect(goToPromoPage).toHaveBeenCalledTimes(1);
    expect(backButton).toBeInTheDocument(1);
  });
});
