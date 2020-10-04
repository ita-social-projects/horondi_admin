import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DeleteButton from './delete-button';
import { config } from '../../../configs';

Enzyme.configure({ adapter: new Adapter() });

const { DELETE_TITLE } = config.buttonTitles;

describe('delete button tests', () => {
  const size = 'small';
  const id = '5f62f5386d3d7c14710c0111';
  const mockCallBack = jest.fn(() => id);
  const component = mount(
    <DeleteButton size={size} onClickHandler={mockCallBack} />
  );

  it('should click', () => {
    expect(component).toMatchSnapshot();
    expect(mockCallBack.mock.calls.length).toBe(0);
    component.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
  it('should exist and have value', () => {
    expect(component.exists());
    expect(component.find('button').prop('aria-label')).toEqual(DELETE_TITLE);
    expect(component.find('button').prop('title')).toEqual(DELETE_TITLE);
    expect(component.prop('onClickHandler')).toEqual(mockCallBack);
  });
  it('should have type', () => {
    expect(component.find('button').type()).toEqual('button');
  });
  it('should have props', () => {
    expect(component.props().size).toBeDefined();
    expect(component.props().size).toEqual(size);
    expect(component.props().onClickHandler).toBeDefined();
    expect(component.props().onClickHandler).toBeTruthy();
  });
});
