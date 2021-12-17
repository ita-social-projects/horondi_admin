import React from 'react';
import PropTypes from 'prop-types';
import { mount, shallow } from 'enzyme';
import { Dialog, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import DialogWindowWrapper from '../dialog-window-wrapper';
import { testProps } from './dialog-window-wrapper.variables';

const setUp = (props) => shallow(<DialogWindowWrapper {...props} />);

describe('Dialog Window Wrapper component', () => {
  let component;
  beforeEach(() => {
    component = setUp(testProps);
  });
  it('Should contain Dialog', () => {
    const dialog = component.find(Dialog);
    expect(dialog.length).toBe(1);
  });
  it('Should contain DialogContent', () => {
    const dialogContent = component.find(DialogContent);
    expect(dialogContent.length).toBe(1);
  });
  it('Should contain DialogTitle', () => {
    const dialogTitle = component.find(DialogTitle);
    expect(dialogTitle.length).toBe(1);
  });
  it('Should contain Tooltip', () => {
    const tooltip = component.find(Tooltip);
    expect(tooltip.length).toBe(1);
  });
});

describe('Dialog Window Wrapper component props', () => {
  const component = mount(<DialogWindowWrapper {...testProps} />);

  it('Should be valid', () => {
    expect(component.props().isOpen).toEqual(true);
    expect(component.props().isOpen).toBeDefined();
    expect(component.props().isOpen).not.toBeNull();
    expect(component.props().isOpen).toEqual(testProps.isOpen);

    expect(component.props().title).toBeDefined();
    expect(component.props().title).not.toBeNull();
    expect(component.props().title).toEqual(testProps.title);

    expect(component.props().handleClose).toBeDefined();
    expect(component.props().handleClose).not.toBeNull();
    expect(component.props().handleClose).toEqual(testProps.handleClose);

    expect(component.props().children).toBeDefined();
    expect(component.props().children).toBeNull();
    expect(component.props().children).toEqual(null);
  });
  it('Should have default props', () => {
    expect(DialogWindowWrapper.defaultProps.children).toBe(null);
  });
  it('Should have prop types', () => {
    expect(DialogWindowWrapper.propTypes.isOpen).toBe(
      PropTypes.bool.isRequired
    );
    expect(DialogWindowWrapper.propTypes.handleClose).toBe(
      PropTypes.func.isRequired
    );
    expect(DialogWindowWrapper.propTypes.title).toBe(
      PropTypes.string.isRequired
    );
  });
});
