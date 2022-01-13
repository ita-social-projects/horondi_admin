import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DialogWindow from '../dialog-window';
import {
  propsWithCancelButton,
  propsWithoutCancelButton
} from './dialog-window.variables';

configure({ adapter: new Adapter() });

let wrapper;
const onClickMock = jest.fn();

jest.mock('react-redux', () => ({
  connect: () => (component) => component,
  useDispatch: () => () => null
}));

describe('DialogWindow component test', () => {
  beforeAll(() => {
    wrapper = mount(
      <DialogWindow {...propsWithCancelButton} onClickHandler={onClickMock} />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should simulate confirmation adn closing of dialog-window', () => {
    wrapper.find('button').at(0).simulate('click');
    wrapper.find('button').at(1).simulate('click');

    expect(onClickMock).toHaveBeenCalled();
  });

  it('should not show cancel button', () => {
    wrapper = mount(<DialogWindow {...propsWithoutCancelButton} />);
    expect(wrapper.find('button').length).toBe(1);
  });
});
