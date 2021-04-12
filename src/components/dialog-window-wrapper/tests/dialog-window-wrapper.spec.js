import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Dialog, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import DialogWindowWrapper from '../dialog-window-wrapper';
import testProps from './variables';

Enzyme.configure({ adapter: new Adapter() });

const setUp = (props) => shallow(<DialogWindowWrapper {...props} />);

describe('should render DialogWindowWrapper component', () => {
  let component;
  beforeEach(() => {
    component = setUp(testProps);
  });
  it('should contain Dialog', () => {
    const dialog = component.find(Dialog);
    expect(dialog.length).toBe(1);
  });
  it('should contain DialogContent', () => {
    const dialogContent = component.find(DialogContent);
    expect(dialogContent.length).toBe(1);
  });
  it('should contain DialogContent', () => {
    const dialogTitle = component.find(DialogTitle);
    expect(dialogTitle.length).toBe(1);
  });
  it('should contain DialogContent', () => {
    const tooltip = component.find(Tooltip);
    expect(tooltip.length).toBe(1);
  });
});

describe('Props testing', () => {
  const component = mount(<DialogWindowWrapper {...testProps} />);

  it('test props: isOpen', () => {
    expect(component.props().isOpen).toEqual(true);
    expect(component.props().isOpen).toBeDefined();
    expect(component.props().isOpen).not.toBeNull();
    expect(component.props().isOpen).toEqual(testProps.isOpen);
  });
  it('test props: title', () => {
    expect(component.props().title).toBeDefined();
    expect(component.props().title).not.toBeNull();
    expect(component.props().title).toEqual(testProps.title);
  });
  it('test props: handleClose', () => {
    expect(component.props().handleClose).toBeDefined();
    expect(component.props().handleClose).not.toBeNull();
    expect(component.props().handleClose).toEqual(testProps.handleClose);
  });
  it('test props: children', () => {
    expect(component.props().children).toBeDefined();
    expect(component.props().children).toBeNull();
    expect(component.props().children).toEqual(null);
  });
});
