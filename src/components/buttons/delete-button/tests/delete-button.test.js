import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DeleteButton from '../delete-button';
import {
  size,
  id,
  mockCallBack,
  title,
  status
} from './delete-button-variables';

import buttonTitles from '../../../../configs/button-titles';
import statuses from '../../../../configs/statuses';

Enzyme.configure({ adapter: new Adapter() });

const { SUCCESS_DELETE_STATUS } = statuses;
const { DELETE_TITLE } = buttonTitles;

describe('delete button tests', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <DeleteButton
        size={size}
        status={status}
        title={title}
        onClickHandler={mockCallBack}
      />
    );
  });
  afterEach(() => {
    component.unmount();
  });
  it('should exist', () => {
    expect(component.exists());
  });
  it('should have type', () => {
    expect(component.find('button').type()).toEqual('button');
  });
  it('should click', () => {
    expect(mockCallBack.mock.calls.length).toBe(0);
    component.simulate('click');
    expect(component.find('button'));
  });
  it('should have value', () => {
    expect(component.prop('size')).toEqual(size);
    expect(component.prop('status')).toEqual(status);
    expect(component.prop('title')).toEqual(title);
    expect(component.prop('onClickHandler')).toEqual(mockCallBack);
  });
  it('should have props', () => {
    expect(component.props().size).toBeDefined();
    expect(component.props().size).toEqual(size);
    expect(component.hasClass('className')).toBeDefined();
    expect(component.props().onClickHandler).toBeDefined();
    expect(component.props().onClickHandler).toBeTruthy();
  });
  it('should have default props', () => {
    expect(DeleteButton.propTypes.size).toBeDefined();
    expect(DeleteButton.propTypes.onClickHandler).toBeDefined();
  });
  it('should be one', () => {
    expect(component.find('button').length).not.toBe(2);
  });
  it('should renders children when passed in', () => {
    const component = shallow(
      <DeleteButton>
        <div className='unique' />
      </DeleteButton>
    );
    expect(component.contains(<div className='unique' />)).toEqual(true);
  });
  it('should have correct title', () => {
    const component = shallow(<DeleteButton>{title}</DeleteButton>);
    expect(component.text()).toBeDefined();
    expect(component.text()).toEqual(DELETE_TITLE);
    expect(component.text()).toBeTruthy();
  });
  it('should have correct status', () => {
    const component = shallow(<DeleteButton>{status}</DeleteButton>);
    expect(component.text()).toBeDefined();
    expect(component.text()).toEqual(SUCCESS_DELETE_STATUS);
    expect(component.text()).toBeTruthy();
  });
  it('test variables', () => {
    expect(size).toBe('small');
    expect(id).toBe('5f62f5386d3d7c14710c0111');
    expect(title).toBe(DELETE_TITLE);
    expect(mockCallBack()).toEqual(id);
    expect(status).toBe(SUCCESS_DELETE_STATUS);
  });
});
