import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as redux from 'react-redux';
import LoadingBar from '../../../../components/loading-bar';
import { matchMock } from './comments-edit.variables';

import CommentForm from '../../../../components/forms/comment-form';
import ReplyComments from '../replyComments/index';
import ReplyCommentForm from '../../../../components/forms/reply-comment-form/reply-comment-form';

import CommentsEdit from '../index';

jest.mock('../../../../hooks/filters/use-reply-comment-filters', () => ({
  __esModule: true,
  default: () => ({
    useReplyCommentFilters: {}
  })
}));
configure({ adapter: new Adapter() });

const mockUseDispatchFn = jest.fn();

describe('Comment form tests', () => {
  const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
  const mockUseSelector = jest.spyOn(redux, 'useSelector');
  let wrapper;

  beforeEach(() => {
    mockUseDispatch.mockReturnValue(() => mockUseDispatchFn());
    mockUseSelector.mockReturnValue({
      loading: false,
      replyFilters: {
        dateFrom: '',
        dateTo: ''
      },
      replySort: '',
      currentPage: 0,
      rowsPerPage: 10,
      replyComments: [],
      currentPageForComments: 0
    });
    wrapper = mount(<CommentsEdit match={matchMock} />);
  });

  afterEach(() => {
    wrapper.unmount();
    mockUseDispatch.mockClear();
    mockUseSelector.mockClear();
  });

  it('Should render component form', () => {
    expect(wrapper).toBeDefined();
    expect(mockUseDispatchFn).toHaveBeenCalled();
  });

  it('Should render loading', () => {
    mockUseSelector.mockReturnValue({
      loading: true,
      replyFilters: {
        dateFrom: '',
        dateTo: ''
      },
      replySort: '',
      currentPage: 0,
      rowsPerPage: 10,
      replyComments: [],
      currentPageForComments: 0
    });
    wrapper = mount(<CommentsEdit match={matchMock} />);
    expect(wrapper.exists(LoadingBar)).toBe(true);
  });

  it('Should render two forms and list', () => {
    expect(wrapper.find(CommentForm)).toBeDefined();
    expect(wrapper.find(ReplyComments)).toBeDefined();
    expect(wrapper.find(ReplyCommentForm)).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
