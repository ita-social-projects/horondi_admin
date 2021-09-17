import React from 'react';
import * as reactRedux from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';

import { config } from '../../../configs';
import LoadingBar from '../../../components/loading-bar';
import TableContainerGenerator from '../../../containers/table-container-generator';
import TableContainerRow from '../../../containers/table-container-row';
import BusinessPageList from '../index';
import mockBusinessPage from './mockBusinessPage';

Enzyme.configure({ adapter: new Adapter() });

const { CREATE_BUSINESS_PAGE } = config.buttonTitles;
let mockLoading = true;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector) => selector(mockBusinessPage(mockLoading)),
  useDispatch: () => jest.fn()
}));

describe('BusinessPageList tests', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const mockHandler = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Router>
        <BusinessPageList />
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
  });

  it('Component BusinessPageList should render and exist', () => {
    mockLoading = false;
    expect(wrapper.exists(BusinessPageList)).toBe(true);
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

  it('TableContainerRow editHandler should be invoked', () => {
    mockLoading = false;
    useDispatchMock.mockReturnValue(mockHandler);
    wrapper = mount(
      <Router>
        <BusinessPageList />
      </Router>
    );
    wrapper.find(TableContainerRow).at(0).props().editHandler();
    expect(mockHandler).toHaveBeenCalledTimes(2);
  });

  it('TableContainerRow deleteHandler should be invoked', () => {
    mockLoading = false;
    useDispatchMock.mockReturnValue(mockHandler);
    wrapper.find(TableContainerRow).at(0).props().deleteHandler();
    expect(mockHandler).toHaveBeenCalledTimes(4);
  });

  it('Button addBusinessPage should exist and be clicked', () => {
    mockLoading = false;
    useDispatchMock.mockReturnValue(mockHandler);
    expect(wrapper.exists(Button)).toBe(true);
    expect(wrapper.find(Button).text()).toBe(CREATE_BUSINESS_PAGE);
  });

  it('Component TableContainerGenerator should exist', () => {
    mockLoading = false;
    expect(wrapper.exists(TableContainerGenerator)).toBe(true);
  });
});
