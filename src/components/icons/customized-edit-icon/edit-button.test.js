import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditButton from './customized-edit-icon';
import { config } from '../../../configs';

Enzyme.configure({ adapter: new Adapter() });

const { EDIT_TITLE } = config.buttonTitles;

describe('edit button tests', () => {
  const size = 'small';
  const mockCallBack = jest.fn();

  let component;

  beforeEach(() => {
    component = mount(<EditButton size={size} onClickHandler={mockCallBack} />);
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
    expect(component.find('button').prop('aria-label')).toEqual(EDIT_TITLE);
    expect(component.find('button').prop('title')).toEqual(EDIT_TITLE);
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
  it('should have default props', () => {
    expect(EditButton.propTypes.size).toBeDefined();
    expect(EditButton.propTypes.onClickHandler).toBeDefined();
  });
});
