import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StandardButton from './standard-button';
import { config, inputTypes } from '../../../configs';

Enzyme.configure({ adapter: new Adapter() });

const { SAVE_TITLE } = config.buttonTitles;

describe('standard button tests', () => {
  const size = 'small';
  const title = SAVE_TITLE;
  const type = inputTypes.button;

  const mockCallBack = jest.fn();
  let component;

  beforeEach(() => {
    component = mount(
      <StandardButton
        size={size}
        title={title}
        type={type}
        onClickHandler={mockCallBack}
      />
    );
  });

  afterEach(() => {
    component.unmount();
  });

  it('should click', () => {
    expect(component).toMatchSnapshot();
    expect(mockCallBack.mock.calls.length).toBe(0);
    component.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
  it('should exist and have value', () => {
    expect(component.exists());
    expect(component.prop('title')).toEqual(SAVE_TITLE);
    expect(component.prop('type')).toEqual(type);
    expect(component.prop('onClickHandler')).toEqual(mockCallBack);
  });
  it('should have type', () => {
    expect(component.find(inputTypes.button).type()).toEqual(inputTypes.button);
  });
  it('should have props', () => {
    expect(component.props().size).toBeDefined();
    expect(component.props().size).toEqual(size);
    expect(component.props().onClickHandler).toBeDefined();
    expect(component.props().onClickHandler).toBeTruthy();
  });
  it('should have propTypes', () => {
    expect(StandardButton.propTypes.title).toBeDefined();
    expect(StandardButton.propTypes.onClickHandler).toBeDefined();
  });
});
