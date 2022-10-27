import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ModelPage from '../model-page';
import { config } from '../../../configs';
import { model, items, products } from './model-page.variables';

jest.mock('react-redux');
useDispatch.mockImplementation(() => jest.fn());
jest.mock('connected-react-router', () => ({
  push: jest.fn()
}));
jest.mock('../../../redux/products/products.operations', () => ({
  deleteManyProducts: () => jest.fn()
}));
jest.mock('../../../redux/constructor/constructor.operations', () => ({
  deleteConstructor: () => jest.fn()
}));
jest.mock('../filters/filters', () => ({
  __esModule: true,
  default() {
    return <div>filters</div>;
  }
}));
jest.mock('../../../utils/use-success-snackbar', () => ({
  __esModule: true,
  default: () => ({
    openSuccessSnackbar: jest.fn((func) => func('6043c1223e06ad3edcdb7b31'))
  })
}));

const pageTitle = config.titles.modelPageTitles.mainPageTitle;
const { CREATE_MODEL_TITLE } = config.buttonTitles;

describe('test model page component', () => {
  it('should render title and button', () => {
    useSelector.mockImplementation(() => ({
      products: [],
      currentPage: 0,
      filter: {
        available: [],
        availableForConstructor: [],
        category: [],
        search: ''
      },
      loading: false
    }));
    render(
      <BrowserRouter>
        <ModelPage />
      </BrowserRouter>
    );
    const addButton = screen.getByText(CREATE_MODEL_TITLE);
    const title = screen.getByText(pageTitle);

    expect(title).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });
  it('should render loader', () => {
    useSelector.mockImplementation(() => ({
      loading: true,
      filter: {
        available: [],
        availableForConstructor: [],
        category: [],
        search: ''
      }
    }));
    render(
      <BrowserRouter>
        <ModelPage />
      </BrowserRouter>
    );
    const loader = screen.getByTestId('loader');

    expect(loader).toBeInTheDocument();
  });
  it('should delete model', () => {
    useSelector.mockImplementation(() => ({
      products,
      loading: false,
      filter: {
        available: [],
        availableForConstructor: [],
        category: [],
        search: ''
      },
      list: [model],
      items
    }));
    render(
      <BrowserRouter>
        <ModelPage />
      </BrowserRouter>
    );
    const deleteButton = screen.getByTestId('del_btn6043c1223e06ad3edcdb7b31');
    fireEvent.click(deleteButton);

    expect(useDispatch).toHaveBeenCalledTimes(1);
  });
});
