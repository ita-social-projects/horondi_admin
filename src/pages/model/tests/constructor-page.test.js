import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ConstructorPage from '../constructor/constructor-page';
import { store, match } from './constructor-page.variables';
import { config } from '../../../configs';

const { constructorBasic } = config.labels.model;
const mockUseHistory = jest.fn();
const mockEditConstructor = jest.fn();

jest.spyOn(console, 'error').mockImplementation(() => {});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    goBack: mockUseHistory
  })
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockEditConstructor
}));

jest.mock('../constructor/constructor-page/constructor-page.styles.js', () => ({
  useStyles: () => ({})
}));

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  }
});

describe('Testing ConstructorPage', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ConstructorPage match={match} />
        </BrowserRouter>
      </Provider>
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it(`Should render component with tab named as '${constructorBasic}' set as default tab`, () => {
    const firstTab = screen.getAllByText(constructorBasic)[0].closest('button');
    expect(firstTab.getAttribute('aria-selected')).toBe('true');
  });

  it('should simulate editHandler', async () => {
    const editBtns = await screen.findAllByTitle(/Редагувати/);
    fireEvent.click(editBtns[0]);
    expect(mockEditConstructor).toHaveBeenCalledTimes(4);
  });

  it('should simulate deleteHandler', async () => {
    const editBtns = await screen.findAllByTitle(/Видалити/);
    fireEvent.click(editBtns[0]);
    expect(mockEditConstructor).toHaveBeenCalledTimes(2);
  });

  it('is goBack btn has been called', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ConstructorPage match={match} />
        </BrowserRouter>
      </Provider>
    );
    const findBackBtn = container.querySelector('[data-cy="back-btn"]');
    expect(findBackBtn).toBeInTheDocument();
    fireEvent.click(findBackBtn);
    expect(mockUseHistory).toHaveBeenCalledTimes(1);
  });
});
