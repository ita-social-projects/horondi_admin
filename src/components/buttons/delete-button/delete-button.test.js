import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DeleteButton from './delete-button';

Enzyme.configure({ adapter: new Adapter() });

describe('delete button tests', () => {
  const size = 'small';
  const id = '5f62f5386d3d7c14710c0111';
  const mockCallBack = jest.fn(() => id);
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
});
