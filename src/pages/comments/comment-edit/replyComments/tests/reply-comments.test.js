import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as redux from 'react-redux';
import { config } from '../../../../../configs';
import LoadingBar from '../../../../../components/loading-bar';
import TableContainerRow from '../../../../../containers/table-container-row';

import ReplyComments from '../index';
import { itemsCount, replyComments } from './reply-comments.variables';

const { NO_REPLY_COMMENTS_MESSAGE } = config.messages;

configure({ adapter: new Adapter() });

const mockUseDispatchFn = jest.fn();
const mockUseSuccessSnackbar = jest.fn();

jest.mock('../../../../../utils/use-success-snackbar', () => ({
  __esModule: true,
  default: () => ({
    openSuccessSnackbar: mockUseSuccessSnackbar
  })
}));

describe('Comment form tests', () => {
  const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
  const mockUseSelector = jest.spyOn(redux, 'useSelector');
  let wrapper;

  beforeEach(() => {
    mockUseDispatch.mockImplementation(() => mockUseDispatchFn());
    mockUseSelector.mockReturnValue({ loading: false });
    wrapper = mount(
      <ReplyComments itemsCount={itemsCount} replyComments={replyComments} />
    );
  });

  afterEach(() => {
    wrapper.unmount();
    mockUseDispatch.mockClear();
    mockUseSelector.mockClear();
  });

  it('Should render component form', () => {
    expect(wrapper).toBeDefined();
  });

  it('Should render loading', () => {
    mockUseSelector.mockReturnValue({ loading: true });
    wrapper = mount(
      <ReplyComments itemsCount={itemsCount} replyComments={replyComments} />
    );
    expect(wrapper.exists(LoadingBar)).toBe(true);
  });

  it('Should render emty title', () => {
    wrapper = mount(
      <ReplyComments itemsCount={itemsCount} replyComments={[]} />
    );
    expect(wrapper.find('p').text()).toBe(NO_REPLY_COMMENTS_MESSAGE);
  });

  it('Should simulate deleteHandler', () => {
    wrapper.find(TableContainerRow).at(0).props().deleteHandler();
    expect(mockUseDispatchFn).toHaveBeenCalledTimes(6);
    expect(mockUseSuccessSnackbar).toHaveBeenCalledTimes(1);
  });

  it('Should simulate deleteHandler', () => {
    mockUseDispatch.mockReturnValue(() => mockUseDispatchFn());
    wrapper = mount(
      <ReplyComments itemsCount={itemsCount} replyComments={replyComments} />
    );
    wrapper.find(TableContainerRow).at(2).props().editHandler();
    expect(mockUseDispatchFn).toHaveBeenCalledTimes(8);
  });
});
