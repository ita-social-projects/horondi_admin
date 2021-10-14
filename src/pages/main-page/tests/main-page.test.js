import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  useSelector as useSelectorMock,
  useDispatch as useDispatchMock
} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import MainPage from '../index';
import titles from '../../../configs/titles';
import LoadingBar from '../../../components/loading-bar';
import messages from '../../../configs/messages';
import TableContainerGenerator from '../../../containers/table-container-generator';
import variables from './variables';

const mockStore = variables;
const { mainTitle, commentsTitle, ordersTitle } = titles.mainPageTitles;
const { EMPTY_LIST } = messages;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementationOnce((selector) => selector()),
  useDispatch: jest.fn()
}));

configure({ adapter: new Adapter() });

describe('Main-page component tests', () => {
  const mockHolder = jest.fn();
  let wrapper;

  beforeEach(() => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue(mockStore);
    wrapper = mount(<MainPage />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should render Main-page component', () => {
    expect(wrapper).toBeDefined();
  });

  it(`Should render Typography with "${mainTitle}" label`, () => {
    expect(wrapper.exists(Typography)).toBe(true);
    expect(wrapper.find(Typography).first().text()).toBe(mainTitle);
  });

  it(`Should render Typography with "${ordersTitle}" label`, () => {
    expect(wrapper.find(Typography).at(1).text()).toBe(ordersTitle);
  });

  it(`Should render Typography with "${commentsTitle}" label`, () => {
    expect(wrapper.find(Typography).at(2).text()).toBe(commentsTitle);
  });

  it('Should render LoadingBar', () => {
    mockStore.orderLoading = true;
    wrapper = mount(<MainPage />);
    expect(wrapper.exists(LoadingBar)).toBe(true);
    expect(wrapper).toBeDefined();
    mockStore.orderLoading = false;
  });

  it('Should handle click on order', () => {
    useDispatchMock.mockReturnValue(mockHolder);
    wrapper = mount(<MainPage />);
    wrapper.find('[data-cy="order"]').at(0).simulate('click');
    expect(mockHolder.mock.calls.length).toEqual(4);
  });

  it('Should handle click on comment', () => {
    useDispatchMock.mockReturnValue(mockHolder);
    wrapper = mount(<MainPage />);
    wrapper.find('[data-cy="comment"]').at(0).simulate('click');
    expect(mockHolder.mock.calls.length).toEqual(4);
  });

  it('Should render TableContainerGenerator', () => {
    expect(wrapper.exists(TableContainerGenerator)).toBe(true);
    expect(wrapper.find(TableContainerGenerator).length).toBe(2);
  });

  it(`Should render orders with "${EMPTY_LIST}" label`, () => {
    mockStore.ordersList = null;
    wrapper = mount(<MainPage />);
    expect(wrapper.find('[data-cy="empty-orders"]').text()).toEqual(EMPTY_LIST);
  });

  it(`Should render comments with "${EMPTY_LIST}" label`, () => {
    mockStore.recentComments = null;
    wrapper = mount(<MainPage />);
    expect(wrapper.find('[data-cy="empty-comments"]').text()).toEqual(
      EMPTY_LIST
    );
  });
});
