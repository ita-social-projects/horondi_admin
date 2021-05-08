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
import Sizes from '../sizes';
import mockStoreReturner from './mockStoreReturner';

const { CREATE_SIZE_TITLE } = config.buttonTitles;
let mockLoading = true;

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../../hooks/filters/useSizesFilters');

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector) => selector(mockStoreReturner(mockLoading)),
  useDispatch: () => jest.fn()
}));

describe('page Sizes tests', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const mockHandler = jest.fn();
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
    mockLoading = true;
    expect(wrapper.exists(TableContainerRow)).toBe(false);
  });

  it('TableContainerRow editHandler should be invoked', () => {
    mockLoading = false;
    useDispatchMock.mockReturnValue(mockHandler);
    wrapper = mount(
      <Router>
        <Sizes />
      </Router>
    );
    expect(mockHandler).toHaveBeenCalled();
  });

  it('TableContainerRow deleteHandler should be invoked', () => {
    mockLoading = false;
    useDispatchMock.mockReturnValue(mockHandler);
    expect(mockHandler).toHaveBeenCalled();
  });

  it('Button addSize should be exist and clicked', () => {
    mockLoading = false;
    useDispatchMock.mockReturnValue(mockHandler);
    expect(wrapper.exists(Button)).toBe(true);
    expect(wrapper.find(Button).text()).toBe(CREATE_SIZE_TITLE);
  });

  it('Component TableContainerGenerator should exist', () => {
    mockLoading = true;
    expect(wrapper.exists(TableContainerGenerator)).toBe(false);
  });
});
