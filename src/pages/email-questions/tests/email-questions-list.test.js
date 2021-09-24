import React from 'react';
import {
  useSelector as useSelectorMock,
  useDispatch as useDispatchMock
} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';

import dataList from './dataList';
import EmailQuestionsList from '../email-questions-list';
import LoadingBar from '../../../components/loading-bar';
import TableContainerCollapsableRow from '../../../containers/table-container-collapsable-row';
import useQuestionFilters from '../../../hooks/filters/use-question-filters';

jest.mock('../../../hooks/filters/use-question-filters');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementationOnce((selector) => selector()),
  useDispatch: jest.fn()
}));
Enzyme.configure({ adapter: new Adapter() });

xdescribe('EmailQuestions test', () => {
  let wrapper;

  it('Should render Question page', () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({ filters: 'test' });
    wrapper = mount(<EmailQuestionsList />);
    expect(wrapper).toBeDefined();
  });

  it('should render LoadingBar', () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({ filters: 'test', loading: true });
    wrapper = mount(<EmailQuestionsList />);
    expect(wrapper.exists(LoadingBar)).toBe(true);
  });

  it('should render TableContainerCollapsableRow', () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({
      filters: 'test',
      loading: false,
      list: dataList
    });
    wrapper = mount(<EmailQuestionsList />);
    expect(wrapper.exists(TableContainerCollapsableRow)).toBe(true);
  });

  it('should call commentDeleteHandler', () => {
    const mockedDispatch = jest.fn();
    const stopPropagation = () => {};
    const mockedEvent = { stopPropagation };
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({
      filters: 'test',
      loading: false,
      list: dataList
    });
    wrapper = mount(<EmailQuestionsList />);
    wrapper
      .find(TableContainerCollapsableRow)
      .at(0)
      .props()
      .deleteHandler(mockedEvent);
    expect(mockedDispatch).toHaveBeenCalled();
  });

  it('should call checkboxChangeHandler', () => {
    const mockedDispatch = jest.fn();
    const stopPropagation = () => {};
    const mockedEvent = { stopPropagation };
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({
      filters: 'test',
      loading: false,
      list: dataList
    });
    wrapper = mount(<EmailQuestionsList />);
    wrapper
      .find(TableContainerCollapsableRow)
      .at(0)
      .props()
      .checkboxChangeHandler(mockedEvent);
    expect(mockedDispatch).toHaveBeenCalled();
  });

  it('should call answer handler', () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({
      filters: 'test',
      loading: false,
      list: dataList
    });
    wrapper = mount(<EmailQuestionsList />);
    wrapper.find(TableContainerCollapsableRow).at(0).props().onAnswer(123);
    expect(mockedDispatch).toHaveBeenCalled();
  });

  it('should render when question options equal null', () => {
    useQuestionFilters.mockImplementationOnce(() => null);
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({ filters: 'test' });
    wrapper = mount(<EmailQuestionsList />);
    expect(wrapper).toBeDefined();
  });
});
