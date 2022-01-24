import React from 'react';
import { mount } from 'enzyme';
import StandardButton from './standard-button';
import { config, inputTypes } from '../../../configs';

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
    expect(mockCallBack.mock.calls.length).toBe(0);
    component.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
  it('should exist and have value', () => {
    expect(component.prop('title')).toEqual(SAVE_TITLE);
    expect(component.prop('type')).toEqual(type);
    expect(component.prop('onClickHandler')).toEqual(mockCallBack);
  });
  it('should have type', () => {
    expect(component.find(inputTypes.button).type()).toEqual(inputTypes.button);
  });
  it('should have props', () => {
    expect(component.props().size).toEqual(size);
  });
});
