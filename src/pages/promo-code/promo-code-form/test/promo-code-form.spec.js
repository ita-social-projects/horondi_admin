import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import PromoCodeForm from '../promo-code-form';

const props = {
  initialState: {
    code: 'HORONDI',
    dateTo: '2022-01-29T10:49:49.736Z',
    dateFrom: '2022-01-28T10:49:49.725Z',
    discount: 10,
    categories: ['backpacks']
  }
};

beforeEach(() => {
  render(
    <BrowserRouter>
      <PromoCodeForm {...props} />
    </BrowserRouter>
  );
});

describe('promo-code-form component test', () => {
  it('should render back button', () => {
    const backButton = screen.getByText(/назад/i);

    expect(backButton).toBeInTheDocument();
  });

  it('should render save button', () => {
    const saveButton = screen.getByText(/зберегти/i);

    expect(saveButton).toBeInTheDocument();
  });

  it('should render create promo code', () => {
    const input = screen.getByText(/створи промокод:/i);

    expect(input).toBeInTheDocument();
  });

  it('should change promocode code name', () => {
    const input = screen.getByDisplayValue(/HORONDI/i);

    fireEvent.change(input, { target: { value: 'TEST' } });
    expect(input.value).toEqual('TEST');
  });

  it('should change promocode discount', () => {
    const input = screen.getByDisplayValue(/10/i);

    fireEvent.change(input, { target: { value: '5' } });
    expect(input.value).toEqual('5');
  });

  it('should render dateFrom', () => {
    const input = screen.getByText(/2022-01-28/i);

    expect(input).toBeInTheDocument();
  });

  it('should render dateTo', () => {
    const input = screen.getByText(/2022-01-29/i);

    expect(input).toBeInTheDocument();
  });

  it('should render discount size', () => {
    const text = screen.getByText(/Розмір знижки у процентах:/i);

    expect(text).toBeInTheDocument();
  });

  it('should render categories title', () => {
    const text = screen.getByText(/Застосувати до:/i);

    expect(text).toBeInTheDocument();
  });

  it('should render checkbox', () => {
    const checkbox = screen.getByLabelText(/Всі товари/i);

    expect(checkbox).toBeInTheDocument();
  });

  it('should click checkbox', () => {
    const checkbox = screen.getByLabelText(/Рюкзаки/i);

    expect(checkbox.checked).toEqual(true);

    fireEvent.click(checkbox);

    expect(checkbox.checked).toEqual(false);
  });
});
