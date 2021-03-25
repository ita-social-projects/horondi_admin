import React from 'react';
import { useDispatch } from 'react-redux';
import * as reactRedux from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';

import LoadingBar from '../../../components/loading-bar';
import TableContainerGenerator from '../../../containers/table-container-generator';
import TableContainerRow from '../../../containers/table-container-row';
import { config } from '../../../configs';
import Sizes from '../sizes';
import mockReturner from './sizes.variables';

const { CREATE_SIZE_TITLE } = config.buttonTitles;
let mockLoading = true;

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector) => selector(mockReturner(mockLoading)),
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
