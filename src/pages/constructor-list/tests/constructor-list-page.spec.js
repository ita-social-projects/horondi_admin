import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount } from 'enzyme';
import mockStore from './mockStore';
import ConstructorListPage from '../constructor-list-page';
import LoadingBar from '../../../components/loading-bar';

import { config } from '../../../configs';

const { NO_CONSTRUCTOR_MESSAGE } = config.messages;

configure({ adapter: new Adapter() });

describe('constructor-page tests', () => {
  let wrapper;
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockStore);

    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);

    wrapper = shallow(<ConstructorListPage />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
  });

  test('Should render constructor-page', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
  });

  it('should render loading bar', () => {
    spyOnUseSelector.mockImplementation(() => ({
      ...mockStore,
      loading: true
    }));
    wrapper = shallow(<ConstructorListPage />);
    expect(wrapper.find(LoadingBar)).toBeDefined();
  });

  it('should render no constructors message', () => {
    spyOnUseSelector.mockImplementation(() => ({
      ...mockStore,
      items: []
    }));
    wrapper = shallow(<ConstructorListPage />);
    expect(wrapper.text().includes(NO_CONSTRUCTOR_MESSAGE)).toBe(true);
  });
});

describe('UseEffect tests', () => {
  let spyOnUseSelector;
  let mockDispatchFn;
  let wrapper;
  let constructorPage;
  let tableContainerRowFirst;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockStore);

    mockDispatchFn = jest.fn();
    reactRedux.useDispatch = jest.fn().mockImplementation(() => mockDispatchFn);

    wrapper = mount(
      <BrowserRouter>
        <ConstructorListPage />
      </BrowserRouter>
    );
    constructorPage = wrapper.find(ConstructorListPage);
    tableContainerRowFirst = constructorPage.find({
      id: '60eadfb9e913fc3f88294bd9'
    });
  });
  afterEach(() => {
    wrapper.unmount();
    spyOnUseSelector.mockClear();
  });

  test('UseEffect hook should work out', () => {
    expect(mockDispatchFn).toHaveBeenCalled();
  });

  test('deleteHandler should work out', () => {
    tableContainerRowFirst.at(0).props().deleteHandler();
    expect(mockDispatchFn).toHaveBeenCalledTimes(3);
  });

  test('editHandler should work out', () => {
    tableContainerRowFirst.at(0).props().editHandler();
    expect(mockDispatchFn).toHaveBeenCalledTimes(3);
  });
});
