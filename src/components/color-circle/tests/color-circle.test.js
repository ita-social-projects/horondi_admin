import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Tooltip } from '@material-ui/core';
import ColorCircle from '../color-circle';
// import { useStyles } from '../color-circle.styles';
import { mockColor, mockSize } from './color-circle.variables';

configure({ adapter: new Adapter() });

describe('ColorCircle tests', () => {
  // let className;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ColorCircle color={mockColor} size={mockSize} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render Tooltip component', () => {
    // className = useStyles({ mockColor, mockSize });
    expect(wrapper.exists(Tooltip)).toBe(true);
    // expect(wrapper.find(div)).toBe(true);
    expect(wrapper.find(Tooltip).children()).toHaveLength(1);
  });
});
