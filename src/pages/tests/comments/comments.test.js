import React from 'react';
import {
  useSelector as useSelectorMock,
  useDispatch as useDispatchMock
} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';

import dataList from './dataList';
import Comments from '../../comments/comments';
import LoadingBar from '../../../components/loading-bar';
import TableContainerRow from '../../../containers/table-container-row';
import useCommentFilters from '../../../hooks/filters/use-comment-filters';

jest.mock('../../../hooks/filters/use-comment-filters');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementationOnce((selector) => selector()),
  useDispatch: jest.fn()
}));
Enzyme.configure({ adapter: new Adapter() });

describe('Comments test', () => {
  let wrapper;

  it('Should render Comments page', () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({ filter: 'test' });
    wrapper = mount(<Comments />);
    expect(wrapper).toBeDefined();
  });

  it('should render LoadingBar', () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({ filter: 'test', loading: true });
    wrapper = mount(<Comments />);
    expect(wrapper.exists(LoadingBar)).toBe(true);
  });

  it('should render TableContainerRow', () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({
      filter: 'test',
      loading: false,
      list: dataList
    });
    wrapper = mount(<Comments />);
    expect(wrapper.exists(TableContainerRow)).toBe(true);
  });

  it('should call commentDeleteHandler', () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({
      filter: 'test',
      loading: false,
      list: dataList
    });
    wrapper = mount(<Comments />);
    wrapper.find(TableContainerRow).at(0).props().deleteHandler();
    expect(mockedDispatch).toHaveBeenCalled();
  });

  it('should call editHandler', () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({
      filter: 'test',
      loading: false,
      list: dataList
    });
    wrapper = mount(<Comments />);
    wrapper.find(TableContainerRow).at(0).props().editHandler();
    expect(mockedDispatch).toHaveBeenCalled();
  });

  it('should render when comment options equal null', () => {
    useCommentFilters.mockImplementationOnce(() => null);
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({ filter: 'test' });
    wrapper = mount(<Comments />);
    expect(wrapper).toBeDefined();
  });
});
