import React from 'react';
import { mount, shallow } from 'enzyme';
import * as reactRedux from 'react-redux';
import AdminTab from '../admin-tab';
import LoadingBar from '../../../../../components/loading-bar';
import TableContainerRow from '../../../../../containers/table-container-row';
import { admins } from './variables';

describe('Testing filters in users', () => {
  let spyOnUseDispatch;
  let mockDispatch;
  let spyOnUseSelector;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');
    mockDispatch = jest.fn();

    spyOnUseSelector.mockReturnValue({ userLoading: false });
    spyOnUseDispatch.mockReturnValue(mockDispatch);
  });

  it('should render AdminTab', () => {
    const wrapper = shallow(<AdminTab list={admins} />);

    expect(wrapper).toBeDefined();
  });

  it('should render LoadingBar', () => {
    spyOnUseSelector.mockReturnValue({ userLoading: true });
    const wrapper = shallow(<AdminTab list={admins} />);

    expect(wrapper.exists(LoadingBar)).toBe(true);
  });

  it('should render TableContainerRow', () => {
    const wrapper = mount(<AdminTab list={admins} />);

    expect(wrapper.exists(TableContainerRow)).toBe(true);
  });
});
