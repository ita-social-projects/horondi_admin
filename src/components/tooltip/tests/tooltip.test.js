import React from 'react';
import { mount } from 'enzyme';

import { IconButton, Tooltip as TooltipUI } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

import {
  TooltipTitle,
  TooltipButton as Tooltip,
  placementCases
} from '../tooltip';

import { topPlacement, wrongPlacement, title, text } from './variables';

import { sizes } from '../../../configs/tooltip-titles';

describe('Tooltip test', () => {
  let wrapper;
  let wrapperWithoutPlacement;
  let titleWrapper;
  let titleWrapperWithChildren;

  beforeEach(() => {
    titleWrapperWithChildren = mount(
      <TooltipTitle text={title}>
        <span />
      </TooltipTitle>
    );
    titleWrapper = mount(<TooltipTitle text={title} />);
    wrapper = mount(
      <Tooltip title={title} placement={topPlacement}>
        <span>{text}</span>
      </Tooltip>
    );
    wrapperWithoutPlacement = mount(
      <Tooltip title={title} placement={wrongPlacement}>
        <span>{text}</span>
      </Tooltip>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should render component', () => {
    expect(wrapper).toBeDefined();
  });

  it('Should render title component', () => {
    expect(titleWrapper).toBeDefined();
  });

  it('Should not to be equal tooltip titles childrens', () => {
    expect(titleWrapperWithChildren).not.toEqual(titleWrapper);
  });

  it('Should not to be equal tooltip titles childrens', () => {
    expect(wrapper).not.toEqual(wrapperWithoutPlacement);
  });

  it('Should not contain wrong placement', () => {
    expect(placementCases.includes('tops')).toBeFalsy();
  });

  it('Should render TooltipUI', () => {
    expect(wrapper.exists(TooltipUI)).toBe(true);
  });

  it('Should render HelpIcon by default', () => {
    expect(wrapper.exists(HelpIcon)).toBe(true);
  });

  it('Should render IconButton by default', () => {
    expect(wrapper.exists(IconButton)).toBe(true);
  });

  it('Should tooltip messages to be define', () => {
    expect(sizes).toBeDefined();
  });
});
