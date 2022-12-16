import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { act } from 'react-dom/test-utils';
import NovaPost from '../nova-post';
import { props, inputOptions, errorInputOptions } from './nova-post.variables';

jest.mock('react-redux');

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
const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);
useSelector.mockImplementation(() => ({
  deliveryLoading: false,
  cities: [],
  warehouses: [
    {
      description: 'Пункт приймання - видачі (до 30 кг): вул. Полтавська, 2',
      number: 1
    }
  ]
}));

describe('tests for the NovaPost component', () => {
  it('renders the NovaPost component correctly', () => {
    render(
      <NovaPost
        {...props}
        setFieldValue={setFieldValue}
        inputOptions={{ ...inputOptions, handleBlur }}
      />
    );

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
  });

  it('renders the NovaPost component correctly', async () => {
    render(
      <NovaPost
        {...props}
        setFieldValue={setFieldValue}
        inputOptions={{ ...inputOptions, handleBlur }}
      />
    );

    const autocomplete = screen.getByTestId('cityNovaPost');
    const input = within(autocomplete).getByRole('textbox');
    autocomplete.focus();
    act(() => {
      fireEvent.change(input, { target: { value: 'Київ' } });
    });
    await act(async () => new Promise((resolve) => setTimeout(resolve, 500)));

    expect(await dispatch).toHaveBeenCalled();
  });

  it('should show an error for the first field', () => {
    render(
      <NovaPost
        {...props}
        setFieldValue={setFieldValue}
        inputOptions={{ ...errorInputOptions, handleBlur }}
      />
    );

    const city = screen.getByTestId('delivery.novaPost.city');
    expect(city).toHaveTextContent('Поле не може бути порожнім');
  });

  it('should not show an error for the second field', () => {
    render(
      <NovaPost
        {...props}
        setFieldValue={setFieldValue}
        inputOptions={{ ...errorInputOptions, handleBlur }}
      />
    );

    const courierOffice = screen.getByTestId('delivery.novaPost.courierOffice');
    expect(courierOffice).not.toHaveTextContent('Поле не може бути порожнім');
  });
});
