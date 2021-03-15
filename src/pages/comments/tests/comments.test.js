import React from 'react';
import {
  useSelector as useSelectorMock,
  useDispatch as useDispatchMock
} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Comments as CommentsNoStore } from '../comments';
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
  const state = { loading: false };

  const mockStore = configureStore([]);
  const store = mockStore(() => ({
    Comments: { ...state }
  }));

  it('Should render Comments page', () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({ filter: 'test' });
    wrapper = mount(<CommentsNoStore />);
    expect(wrapper).toBeDefined();
  });

  it('should render LoadingBar', () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({ filter: 'test', loading: true });
    wrapper = mount(<CommentsNoStore />);
    expect(wrapper.exists(LoadingBar)).toBe(true);
  });

  it('should render TableContainerRow', () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({
      filter: 'test',
      loading: false,
      list: [
        {
          date: '1615278615760',
          product: { _id: '6043c3303e06ad3edcdb7b34' },
          show: true,
          text:
            'Допоможіть! Дитина помалювала фламастером, нічим не можу вивести.',
          user: {
            _id: '5fcfc2c5823c593d1c28c459',
            firstName: 'Ivan',
            email: 'vaaeking@gmail.com'
          },
          _id: '6047321793650236ddbfb841'
        },

        {
          date: '1615278615760',
          product: { _id: '6043c3303e06ad3edcdb7b345' },
          show: true,
          text:
            'Допоможіть! Дитина помалювала фламастером, нічим не можу вивести.',
          user: {
            _id: '5fcfc2c5823c593d1c28c459',
            firstName: 'Ivan',
            email: 'vaaeking@gmail.com'
          },
          _id: '6047321793650236ddbfb841'
        }
      ]
    });
    wrapper = mount(<CommentsNoStore />);
    expect(wrapper.exists(TableContainerRow)).toBe(true);
  });

  it('should call commentDeleteHandler', () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({
      filter: 'test',
      loading: false,
      list: [
        {
          date: '1615278615760',
          product: { _id: '6043c3303e06ad3edcdb7b34' },
          show: true,
          text:
            'Допоможіть! Дитина помалювала фламастером, нічим не можу вивести.',
          user: {
            _id: '5fcfc2c5823c593d1c28c459',
            firstName: 'Ivan',
            email: 'vaaeking@gmail.com'
          },
          _id: '6047321793650236ddbfb841'
        },

        {
          date: '1615278615760',
          product: { _id: '6043c3303e06ad3edcdb7b345' },
          show: true,
          text:
            'Допоможіть! Дитина помалювала фламастером, нічим не можу вивести.',
          user: {
            _id: '5fcfc2c5823c593d1c28c459',
            firstName: 'Ivan',
            email: 'vaaeking@gmail.com'
          },
          _id: '6047321793650236ddbfb841'
        }
      ]
    });
    wrapper = mount(<CommentsNoStore />);
    wrapper.find(TableContainerRow).at(0).props().deleteHandler();
    expect(mockedDispatch).toHaveBeenCalled();
  });

  it('should call editHandler', () => {
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({
      filter: 'test',
      loading: false,
      list: [
        {
          date: '1615278615760',
          product: { _id: '6043c3303e06ad3edcdb7b34' },
          show: true,
          text:
            'Допоможіть! Дитина помалювала фламастером, нічим не можу вивести.',
          user: {
            _id: '5fcfc2c5823c593d1c28c459',
            firstName: 'Ivan',
            email: 'vaaeking@gmail.com'
          },
          _id: '6047321793650236ddbfb841'
        },

        {
          date: '1615278615760',
          product: { _id: '6043c3303e06ad3edcdb7b345' },
          show: true,
          text:
            'Допоможіть! Дитина помалювала фламастером, нічим не можу вивести.',
          user: {
            _id: '5fcfc2c5823c593d1c28c459',
            firstName: 'Ivan',
            email: 'vaaeking@gmail.com'
          },
          _id: '6047321793650236ddbfb841'
        }
      ]
    });
    wrapper = mount(<CommentsNoStore />);
    wrapper.find(TableContainerRow).at(0).props().editHandler();
    expect(mockedDispatch).toHaveBeenCalled();
  });

  it('should render when comment options equal null', () => {
    useCommentFilters.mockImplementationOnce(() => null);
    const mockedDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockedDispatch);
    useSelectorMock.mockReturnValue({ filter: 'test' });
    wrapper = mount(<CommentsNoStore />);
    expect(wrapper).toBeDefined();
  });
});