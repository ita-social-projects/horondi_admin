import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';

import PromoCodeEdit from '../promo-code-edit';
import mocks from './promo-code-edit.variables';

jest.mock('react-redux');
const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);

beforeEach(() => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <PromoCodeEdit />
      </BrowserRouter>
    </MockedProvider>
  );
  screen.debug();
});
describe('edit loading', () => {
  it('loader', () => {
    const tree = screen.findByRole(/progressbar/i);
    expect(tree).toBeDefined();
  });

  it('test', async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));

    const component = screen.findByTestId(/container/i);
    expect(component).toBeDefined();
  });
});
