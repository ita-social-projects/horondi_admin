import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { Button, Typography } from '@material-ui/core';
import { configure, shallow, mount } from 'enzyme';
import mockPockets from '../../pockets/tests/mockPockets';
import ClosuresPage from '../closures-page';
import TableContainerGenerator from '../../../containers/table-container-generator';
import TableContainerRow from '../../../containers/table-container-row';
import LoadingBar from '../../../components/loading-bar';

import { config } from '../../../configs';

const { CREATE_CLOSURES_TITLE } = config.buttonTitles;
const { pathToClosuresAdd } = config.routes;
const tableTitles = config.tableHeadRowTitles.closures;

configure({ adapter: new Adapter() });

describe('Closure-page render tests', () => {
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
    spyOnUseSelector.mockImplementation(() => mockPockets);

    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);

    wrapper = shallow(<ClosuresPage />);
    typography = wrapper.find(Typography);
    button = wrapper.find(Button);
    tableContainerGenerator = wrapper.find(TableContainerGenerator);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
  });

  test('Should render closure-page', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
  });

  test(`Should render Typography wrapper with "${config.titles.closuresTitles}" label`, () => {
    expect(wrapper.exists(Typography)).toBe(true);
    expect(typography).toHaveLength(1);
    expect(typography.text()).toBe(config.titles.closuresTitles.mainPageTitle);
  });

  test(`Should render button wrapper`, () => {
    expect(wrapper.exists(Button)).toBe(true);
    expect(button).toHaveLength(1);
    expect(button.text()).toBe(CREATE_CLOSURES_TITLE);
    expect(button.prop('component')).toEqual(Link);
    expect(button.prop('to')).toBe(pathToClosuresAdd);
  });

  test('Should render Table Container Generator', () => {
    expect(wrapper.exists(TableContainerGenerator)).toBe(true);
    expect(tableContainerGenerator).toHaveLength(1);
    expect(wrapper.exists(LoadingBar)).toBe(false);
    expect(tableContainerGenerator.prop('tableTitles')).toBe(tableTitles);
  });

  test('Should render Loading Bar', () => {
    mockPockets.loading = true;
    wrapper = shallow(<ClosuresPage />);
    const loadingBar = wrapper.find(LoadingBar);
    expect(wrapper.exists(LoadingBar)).toBeDefined();
    expect(wrapper.exists(LoadingBar)).toBe(true);
    expect(loadingBar).toHaveLength(1);
    expect(wrapper.exists(TableContainerGenerator)).toBe(false);
    mockPockets.loading = false;
  });

  test('useSelector hook should be called', () => {
    getState = reactRedux.useSelector(mockPockets);
    expect(getState).toEqual(mockPockets);
    expect(spyOnUseSelector).toHaveBeenCalled();
  });
});

describe('useEffect tests', () => {
  let spyOnUseSelector;
  let mockDispatchFn;
  let wrapper;
  let closurePage;
  let tableContainerRow;
  let tableContainerRowFirst;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockPockets);

    mockDispatchFn = jest.fn();
    reactRedux.useDispatch = jest.fn().mockImplementation(() => mockDispatchFn);

    wrapper = mount(
      <BrowserRouter>
        <ClosuresPage />
      </BrowserRouter>
    );
    closurePage = wrapper.find(ClosuresPage);
    tableContainerRow = closurePage.find(TableContainerRow);
    tableContainerRowFirst = closurePage.find({
      id: mockPockets.items[0]._id
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
    expect(closurePage.exists(TableContainerRow)).toBe(true);
    expect(tableContainerRow).toHaveLength(1);
    expect(tableContainerRowFirst.prop('available')).toBe('Доступний');
    expect(tableContainerRowFirst.prop('name')).toBe(
      mockPockets.items[0].name[0].value
    );
    expect(tableContainerRowFirst.prop('image')).toBeTruthy();
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
