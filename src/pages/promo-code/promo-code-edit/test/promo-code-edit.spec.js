import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { useDispatch } from 'react-redux';
import { createMemoryHistory } from 'history';

import PromoCodeEdit from '../promo-code-edit';
import { mocks } from './promo-code-edit.variables';

jest.mock('react-redux');

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

describe('should render component with current data', () => {
  beforeEach(async () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router history={history}>
            <PromoCodeEdit />
          </Router>
        </MockedProvider>
      );
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  it('should change promocode code name', async () => {
    const input = screen.getByDisplayValue(/test/i);

    fireEvent.change(input, { target: { value: 'TEST' } });

    expect(input.value).toEqual('TEST');
  });

  it('should render dateFrom', async () => {
    const input = screen.getByText(/2022-02-09/i);

    expect(input).toBeInTheDocument();
  });

  it('should render dateTo', async () => {
    const input = screen.getByText(/2022-03-04/i);

    expect(input).toBeInTheDocument();
  });

  it('should change promocode discount', async () => {
    const input = screen.getByDisplayValue(/15/i);

    fireEvent.change(input, { target: { value: '5' } });

    expect(input.value).toEqual('5');
  });
});
