import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { Button, Typography } from '@material-ui/core';
import { configure, shallow, mount } from 'enzyme';
import mockStore from './mockStore';
import BackPage from '../back-page';
import TableContainerGenerator from '../../../containers/table-container-generator';
import TableContainerRow from '../../../containers/table-container-row';
import LoadingBar from '../../../components/loading-bar';

import { config } from '../../../configs';

const { CREATE_BACK_TITLE } = config.buttonTitles;
const { pathToAddBacks } = config.routes;
const tableTitles = config.tableHeadRowTitles.backs;

configure({ adapter: new Adapter() });

describe('Back-page render tests', () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;
  let wrapper;
  let typography;
  let button;
  let tableContainerGenerator;
  let getState;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockStore);

    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);

    wrapper = shallow(<BackPage />);
    typography = wrapper.find(Typography);
    button = wrapper.find(Button);
    tableContainerGenerator = wrapper.find(TableContainerGenerator);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
  });

  test('Should render back-page', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
  });

  test(`Should render Typography wrapper with "${config.titles.backTitles}" label`, () => {
    expect(wrapper.exists(Typography)).toBe(true);
    expect(typography).toHaveLength(1);
    expect(typography.text()).toBe(config.titles.backTitles.mainPageTitle);
  });

  test(`Should render button wrapper`, () => {
    expect(wrapper.exists(Button)).toBe(true);
    expect(button).toHaveLength(1);
    expect(button.text()).toBe(CREATE_BACK_TITLE);
    expect(button.prop('component')).toEqual(Link);
    expect(button.prop('to')).toBe(pathToAddBacks);
  });

  test('Should render Table Container Generator', () => {
    expect(wrapper.exists(TableContainerGenerator)).toBe(true);
    expect(tableContainerGenerator).toHaveLength(1);
    expect(wrapper.exists(LoadingBar)).toBe(false);
    expect(tableContainerGenerator.prop('tableTitles')).toBe(tableTitles);
  });

  test('Should render Loading Bar', () => {
    mockStore.loading = true;
    wrapper = shallow(<BackPage />);
    const loadingBar = wrapper.find(LoadingBar);
    expect(wrapper.exists(LoadingBar)).toBeDefined();
    expect(wrapper.exists(LoadingBar)).toBe(true);
    expect(loadingBar).toHaveLength(1);
    expect(wrapper.exists(TableContainerGenerator)).toBe(false);
    mockStore.loading = false;
  });

  test('useSelector hook should be called', () => {
    getState = reactRedux.useSelector(mockStore);
    expect(getState).toEqual(mockStore);
    expect(spyOnUseSelector).toHaveBeenCalled();
  });
});

describe('useEffect tests', () => {
  let spyOnUseSelector;
  let mockDispatchFn;
  let wrapper;
  let backPage;
  let tableContainerRow;
  let tableContainerRowFirst;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockStore);

    mockDispatchFn = jest.fn();
    reactRedux.useDispatch = jest.fn().mockImplementation(() => mockDispatchFn);

    wrapper = mount(
      <BrowserRouter>
        <BackPage />
      </BrowserRouter>
    );
    backPage = wrapper.find(BackPage);
    tableContainerRow = backPage.find(TableContainerRow);
    tableContainerRowFirst = backPage.find({
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

  test('Should render TableContainerRows', () => {
    expect(backPage.exists(TableContainerRow)).toBe(true);
    expect(tableContainerRow).toHaveLength(1);
    expect(tableContainerRowFirst.prop('available')).toBe('Так');
    expect(tableContainerRowFirst.prop('name')).toBe(
      mockStore.list[0].name[0].value
    );
    expect(tableContainerRowFirst.prop('image')).toBeTruthy();
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