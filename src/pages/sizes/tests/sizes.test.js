import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import * as reactRedux from 'react-redux';
import Sizes from '../sizes';
import LoadingBar from '../../../components/loading-bar';
import TableContainerGenerator from '../../../containers/table-container-generator';
import TableContainerRow from '../../../containers/table-container-row';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import { config } from '../../../configs';

let mockLoading = true;

Enzyme.configure({ adapter: new Adapter() });

const { CREATE_SIZE_TITLE } = config.buttonTitles;

function mockReturner() {
  return {
    Sizes: {
      list: [
        {
          _id: '604394cba7532c33dcb326d6',
          name: 'M',
          simpleName: [
            {
              lang: 'ua',
              value: 'Роллтоп'
            },
            {
              lang: 'en',
              value: 'Rolltop'
            }
          ],
          heightInCm: 30,
          widthInCm: 27,
          depthInCm: 13,
          volumeInLiters: 22,
          weightInKg: 1,
          available: true,
          additionalPrice: [
            {
              value: 138746,
              currency: 'UAH'
            },
            {
              value: 5000,
              currency: 'USD'
            }
          ]
        }
      ],
      sizesLoading: mockLoading,
      size: null
    },
    Table: {
      pagination: {
        currentPage: 0,
        rowsPerPage: 10
      },
      itemsCount: 1
    }
  };
}

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector) => selector(mockReturner()),
  useDispatch: () => jest.fn()
}));

describe('page Sizes tests', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const mockeFunction = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Router>
        <Sizes />
      </Router>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should render LoadingBar', () => {
    mockLoading = true;
    expect(wrapper.exists(LoadingBar)).toBe(true);
    expect(wrapper).toBeDefined();
    mockLoading = false;
  });

  it('Component Sizes should render and exist', () => {
    mockLoading = false;
    expect(wrapper.exists(Sizes)).toBe(true);
    expect(wrapper).toBeDefined();
  });

  it('Component Typography should exist', () => {
    mockLoading = false;
    expect(wrapper.exists(Typography)).toBe(true);
  });

  it('Component TableContainerRow should exist', () => {
    mockLoading = false;
    expect(wrapper.exists(TableContainerRow)).toBe(true);
  });

  it('TableContainerRow deleteHandler should be invoked', () => {
    mockLoading = false;
    useDispatchMock.mockReturnValue(mockeFunction);
    wrapper = mount(
      <Router>
        <Sizes />
      </Router>
    );
    wrapper.find(TableContainerRow).at(0).props().deleteHandler();
    expect(mockeFunction.mock.calls.length).toEqual(2);
  });

  it('TableContainerRow editHandler should be invoked', () => {
    mockLoading = false;
    useDispatchMock.mockReturnValue(mockeFunction);
    wrapper.find(TableContainerRow).at(0).props().editHandler();
    expect(mockeFunction.mock.calls.length).toEqual(4);
  });

  it('Button addSize should be exist and clicked', () => {
    mockLoading = false;
    useDispatchMock.mockReturnValue(mockeFunction);
    expect(wrapper.exists(Button)).toBe(true);
    expect(wrapper.find(Button).text()).toBe(CREATE_SIZE_TITLE);
  });

  it('Component TableContainerGenerator should exist', () => {
    mockLoading = false;
    expect(wrapper.exists(TableContainerGenerator)).toBe(true);
  });
});
