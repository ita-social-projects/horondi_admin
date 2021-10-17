import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount } from 'enzyme';
import mockPockets from './mockPockets';
import PocketsPage from '../pockets-page';
import LoadingBar from '../../../components/loading-bar';

import { config } from '../../../configs';

const { NO_POCKET_MESSAGE } = config.messages;

configure({ adapter: new Adapter() });

describe('pockets-page tests', () => {
  let wrapper;
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockPockets);

    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);

    wrapper = shallow(<PocketsPage />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
  });

  test('Should render pockets-page', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
  });

  it('should render loading bar', () => {
    spyOnUseSelector.mockImplementation(() => ({
      ...mockPockets,
      loading: true
    }));
    wrapper = shallow(<PocketsPage />);
    expect(wrapper.find(LoadingBar)).toBeDefined();
  });

  it('should render no pockets message', () => {
    spyOnUseSelector.mockImplementation(() => ({
      ...mockPockets,
      items: []
    }));
    wrapper = shallow(<PocketsPage />);
    expect(wrapper.text().includes(NO_POCKET_MESSAGE)).toBe(true);
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
    spyOnUseSelector.mockImplementation(() => mockPockets);

    mockDispatchFn = jest.fn();
    reactRedux.useDispatch = jest.fn().mockImplementation(() => mockDispatchFn);

    wrapper = mount(
      <BrowserRouter>
        <PocketsPage />
      </BrowserRouter>
    );
    constructorPage = wrapper.find(PocketsPage);
    tableContainerRowFirst = constructorPage.find({
      id: '60fed1aee3a0252140b5b79a'
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
    expect(mockDispatchFn).toHaveBeenCalledTimes(2);
  });

  test('editHandler should work out', () => {
    tableContainerRowFirst.at(0).props().editHandler();
    expect(mockDispatchFn).toHaveBeenCalledTimes(2);
  });
});
