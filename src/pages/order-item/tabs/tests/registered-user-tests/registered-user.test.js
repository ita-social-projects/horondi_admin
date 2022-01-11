import React from 'react';
import * as redux from 'react-redux';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { act } from '@testing-library/react';
import { RegisteredUser } from '../../index';
import { inputName } from '../../../../../utils/order';
import { mockUserId, mockUsers, user } from './registered-user.variables.js';

configure({ adapter: new Adapter() });

const mockSetFieldValue = jest.fn();
const event = jest.fn();

describe('Registered-user tests', () => {
  const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
  const mockUseEffect = jest.spyOn(React, 'useEffect');
  const mockUseSelector = jest.spyOn(redux, 'useSelector');
  let wrapper;

  beforeEach(() => {
    mockUseDispatch.mockImplementation(() => jest.fn());
    mockUseEffect.mockImplementation(() => jest.fn());
    mockUseSelector.mockReturnValue({
      list: mockUsers.list,
      user: mockUsers.user,
      loading: mockUsers.userLoading
    });

    wrapper = mount(
      <RegisteredUser userId={mockUserId} setFieldValue={mockSetFieldValue} />
    );
  });
  afterEach(() => {
    wrapper.unmount();

    mockUseDispatch.mockClear();
    mockUseEffect.mockClear();
    mockUseSelector.mockClear();
  });

  it('should render RegisteredUser component', () => {
    expect(wrapper).toBeDefined();
  });

  it('should coverage getOptionLabel in Autocomplete', () => {
    const label = wrapper.find(Autocomplete).props();
    label.getOptionLabel(mockUsers.list[0]);
    expect(label).toBeDefined();
  });

  it('should coverage onChange in Autocomplete', () => {
    const autocompleteContainer = wrapper.find(Autocomplete).props();
    act(() => {
      autocompleteContainer.onChange(event, user);
    });
    expect(mockSetFieldValue).toHaveBeenCalledWith(inputName.userId, user._id);
  });

  it('expect value in Autocomplete to be null', () => {
    const br = mount(
      <RegisteredUser userId={null} setFieldValue={mockSetFieldValue} />
    );
    const label = br.find(Autocomplete).props();
    expect(label.value).toBe(null);
  });
});
