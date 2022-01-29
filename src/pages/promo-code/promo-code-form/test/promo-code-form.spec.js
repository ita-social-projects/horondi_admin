import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import PromoCodeForm from '../promo-code-form';

beforeEach(() => {
  render(
    <BrowserRouter>
      <PromoCodeForm />
    </BrowserRouter>
  );
});

describe('PromoCodeEdit', () => {
  it('back button', () => {
    const backButton = screen.getByText(/назад/i);

    expect(backButton).toBeInTheDocument();
  });
  it('save button', () => {
    const wrapper = screen.getByText(/зберегти/i);

    expect(wrapper).toBeInTheDocument();
  });

  it('simulate onchange PromoCodeAdd code', () => {
    const input = screen.getByLabelText(/назва промокоду/i);
    expect(input).toBeInTheDocument();
  });
});
