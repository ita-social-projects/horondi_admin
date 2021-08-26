import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { Button, Typography } from '@material-ui/core';
import { configure, shallow, mount } from 'enzyme';
import mockStore from './mockStore';
import BasicsPage from '../basics-page';
import TableContainerGenerator from '../../../containers/table-container-generator';
import TableContainerRow from '../../../containers/table-container-row';
import LoadingBar from '../../../components/loading-bar';

configure({ adapter: new Adapter() });

describe('Basics-page tests', () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;
  let wrapper;
  let typography;
  let button;
  let tableContainerGenerator;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockStore);

    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);

    wrapper = shallow(<BasicsPage />);
    typography = wrapper.find(Typography);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
  });

  it('Should render Basics-page', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render Typography component', () => {
    expect(typography).toHaveLength(1);
  });

  it('should render loading bar', () => {
    spyOnUseSelector.mockImplementation(() => ({
      ...mockStore,
      loading: true
    }));
    wrapper = shallow(<BasicsPage />);
    expect(wrapper.find(LoadingBar)).toBeDefined();
  });

  it('should render TableRows without items', () => {
    spyOnUseSelector.mockImplementation(() => ({
      ...mockStore,
      basicsList: []
    }));
    wrapper = shallow(<BasicsPage />);
    expect(wrapper.find(LoadingBar)).toBeDefined();
  });

  it('should render TableRow without properties', () => {
    spyOnUseSelector.mockImplementation(() => ({
      ...mockStore,
      basicsList: [
        {
          name: mockStore.basicsList[0].name,
          images: null,
          available: false,
          additionalPrice: mockStore.basicsList[0].additionalPrice
        }
      ]
    }));
    wrapper = shallow(<BasicsPage />);
    expect(wrapper.find(LoadingBar)).toBeDefined();
  });
});

describe('useEffect tests', () => {
  let spyOnUseSelector;
  let mockDispatchFn;
  let wrapper;
  let basicPage;
  let tableContainerRow;
  let tableContainerRowFirst;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockStore);

    mockDispatchFn = jest.fn();
    reactRedux.useDispatch = jest.fn().mockImplementation(() => mockDispatchFn);

    wrapper = mount(
      <BrowserRouter>
        <BasicsPage />
      </BrowserRouter>
    );
    basicPage = wrapper.find(BasicsPage);
    tableContainerRow = basicPage.find(TableContainerRow);
    tableContainerRowFirst = basicPage.find({
      id: '60eadfb9e913fc3f88294bd9'
    });
  });

  afterEach(() => {
    wrapper.unmount();
    spyOnUseSelector.mockClear();
  });

  it('UseEffect hook should work out', () => {
    expect(mockDispatchFn).toHaveBeenCalled();
  });

  it('Should render TableContainerRows', () => {
    expect(wrapper.find(TableContainerRow)).toBeDefined();
    expect(tableContainerRow.at(0).props().available).toBe('Доступна');
  });

  it('deleteHandler should work out', () => {
    tableContainerRowFirst.at(0).props().deleteHandler();
    expect(mockDispatchFn).toHaveBeenCalledTimes(2);
  });

  it('editHandler should work out', () => {
    tableContainerRowFirst.at(0).props().editHandler();
    expect(mockDispatchFn).toHaveBeenCalledTimes(2);
  });
});
