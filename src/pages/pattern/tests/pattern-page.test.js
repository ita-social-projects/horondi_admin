import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount, to, be } from 'enzyme';
import { Link, BrowserRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import mockStore from './mockStore';

import PatternPage from '../pattern-page';
import LoadingBar from '../../../components/loading-bar';
import TableContainerGenerator from '../../../containers/table-container-generator';
import TableContainerRow from '../../../containers/table-container-row';

import { config } from '../../../configs';

const { CREATE_PATTERN_TITLE } = config.buttonTitles;
const pathToPatternAddPage = config.routes.pathToAddPattern;
const tableTitles = config.tableHeadRowTitles.patterns;

configure({ adapter: new Adapter() });

describe('Pattern-page render tests', () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;
  let wrapper;
  let typography;
  let button;
  let tableContainerGenerator;
  let getState;

  beforeEach(() => {
    // Mock useSelector hook
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockStore);

    // Mock useEffect

    // Mock useDispatch hook
    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');
    // Mock dispatch function returned from useDispatch
    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);

    wrapper = shallow(<PatternPage />);
    typography = wrapper.find(Typography);
    button = wrapper.find(Button);
    tableContainerGenerator = wrapper.find(TableContainerGenerator);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
  });

  test('Should render pattern-page', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  test(`Should render Typography wrapper with "${config.titles.patternTitles.mainPageTitle}" label`, () => {
    expect(wrapper.exists(Typography)).toBe(true);
    expect(typography).toHaveLength(1);
    expect(typography.text()).toBe(config.titles.patternTitles.mainPageTitle);
  });

  test(`Should render button wrapper`, () => {
    expect(wrapper.exists(Button)).toBe(true);
    expect(button).toHaveLength(1);
    expect(button.text()).toBe(CREATE_PATTERN_TITLE);
    expect(button.prop('component')).toEqual(Link);
    expect(button.prop('to')).toBe(pathToPatternAddPage);
  });

  test('Should render TableContainerGenerator', () => {
    expect(wrapper.exists(TableContainerGenerator)).toBe(true);
    expect(tableContainerGenerator).toHaveLength(1);
    expect(wrapper.exists(LoadingBar)).toBe(false);
    expect(tableContainerGenerator.prop('tableTitles')).toBe(tableTitles);
  });

  test('Should render LoadingBar', () => {
    mockStore.loading = true;
    wrapper = shallow(<PatternPage />);
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
  let spyOnUseDispatch;
  let mockDispatch;
  let wrapper;
  let patternPage;
  let tableContainerRow;
  let tableContainerRowFirst;
  let tableContainerRowSecond;
  let tableContainerRowThird;

  beforeEach(() => {
    // Mock useSelector hook
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockStore);

    // Mock useDispatch hook
    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');
    // Mock dispatch function returned from useDispatch
    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);

    wrapper = mount(
      <BrowserRouter>
        <PatternPage />
      </BrowserRouter>
    );

    patternPage = wrapper.find(PatternPage);

    tableContainerRow = patternPage.find(TableContainerRow);
    tableContainerRowFirst = patternPage.find({
      id: '6043b87c3e06ad3edcdb7b19'
    });
    tableContainerRowSecond = patternPage.find({
      id: '6043b8c53e06ad3edcdb7b1a'
    });
    tableContainerRowThird = patternPage.find({
      id: '6043b90d3e06ad3edcdb7b1b'
    });
  });

  afterEach(() => {
    wrapper.unmount();
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
  });

  test('UseEffect hook shoud work out', () => {
    expect(spyOnUseDispatch).toHaveBeenCalledTimes(2);
  });

  test('Should render TableContainerRow', () => {
    expect(patternPage.exists(TableContainerRow)).toBe(true);
    expect(tableContainerRow).toHaveLength(3);
    expect(tableContainerRowFirst.prop('available')).toBe('Так');
    expect(tableContainerRowSecond.prop('available')).toBe('Так');
    expect(tableContainerRowThird.prop('available')).toBe('Ні');
    expect(tableContainerRowFirst.prop('name')).toBe('Червоний');
    expect(tableContainerRowSecond.prop('name')).toBe('Сірий квадрат');
    expect(tableContainerRowThird.prop('name')).toBe('Голуба стрічка');
    expect(tableContainerRowFirst.prop('image')).toBeTruthy();
    expect(tableContainerRowSecond.prop('image')).toBeTruthy();
    expect(tableContainerRowThird.prop('image')).toBe('');
  });
});
