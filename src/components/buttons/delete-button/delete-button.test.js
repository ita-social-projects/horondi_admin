import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DeleteButton from './delete-button';
import { config } from '../../../configs';

Enzyme.configure({ adapter: new Adapter() });

describe('delete button tests', () => {
  const size = 'small';
  const id = '5f62f5386d3d7c14710c0111';
  const mockCallBack = jest.fn(() => id);
  const text = 'Delete';
  let component;
  beforeEach(() => {
    component = mount(
      <DeleteButton size={size} onClickHandler={mockCallBack} />
    );
  });
  afterEach(() => {
    component.unmount();
  });
  it('should exist', () => {
    expect(component).toMatchSnapshot();
    expect(component.exists());
  });
  it('should have type', () => {
    expect(component.find('button').type()).toEqual('button');
    expect(component).toMatchSnapshot();
  });
  it('should click', () => {
    expect(mockCallBack.mock.calls.length).toBe(0);
    component.simulate('click');
    expect(component.find('button'));
  });
  it('should exist and have value', () => {
    expect(component.exists());
    expect(component.prop('size')).toEqual(size);
    expect(component.prop('onClickHandler')).toEqual(mockCallBack);
  });
  it('should have props', () => {
    expect(component.props().size).toBeDefined();
    expect(component.props().size).toEqual(size);
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
  it('should have title text (children)', () => {
    const component = shallow(<DeleteButton>{text}</DeleteButton>);
    expect(component.text()).toBeDefined();
    expect(component.text()).toEqual('Delete');
    expect(component.text()).toBeTruthy();
  });
  it('should have className', () => {
    const component = shallow(<DeleteButton />);
    expect(component.hasClass('makeStyles-button-8')).toBeDefined();
    expect(component.hasClass('makeStyles-button-8')).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
