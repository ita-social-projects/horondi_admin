import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Tooltip } from '@material-ui/core';
import { noop } from 'lodash';
import ColorCircle from '../color-circle';
import { mockColor, mockSize } from './color-circle.variables';

configure({ adapter: new Adapter() });

describe('ColorCircle tests', () => {
  const mockOnDelete = jest.fn(noop);
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ColorCircle color={mockColor} size={mockSize} onDelete={mockOnDelete} />
    );
  });

  afterEach(() => {
    wrapper.unmount();
    mockOnDelete.mockClear();
  });

  it('should render Tooltip component', () => {
    expect(wrapper.exists(Tooltip)).toBe(true);
    expect(wrapper.find(Tooltip).children()).toHaveLength(1);
  });

  it('should run onDelete when click on the div', () => {
    wrapper.find('div').simulate('click');
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
