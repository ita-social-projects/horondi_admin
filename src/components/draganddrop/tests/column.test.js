import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Droppable } from 'react-beautiful-dnd';
import { Paper, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import Slide from '../slide';
import Column from '../column';
import { testProps, emptyColumn } from './column.variables';

Enzyme.configure({ adapter: new Adapter() });

const setUp = (props) => shallow(<Column {...props} />);
const setUpWithoutColumn = (props) => shallow(<Column {...props} />);

describe('Dialog Window Wrapper component', () => {
  let component;
  beforeEach(() => {
    component = setUp(testProps);
  });
  it('Should contain Droppable', () => {
    const droppable = component.find(Droppable);
    expect(droppable.length).toBe(1);
  });
  it('Should contain Paper', () => {
    const paper = component.find(Paper);
    expect(paper.length).toBe(1);
  });
  it('Should contain Slide', () => {
    const slide = component.find(Slide);
    expect(slide.length).toBe(0);
  });
  it('Should contain Droppable', () => {
    const droppable = component.find(Droppable);
    expect(droppable.children()).toHaveLength(1);
  });
  it('Should contain Droppable', () => {
    component = setUpWithoutColumn(emptyColumn);
    const droppable = component.find(Droppable);
    const child = droppable.find('div');
    const slide = child.find(Slide);
    expect(slide).toHaveLength(0);
  });
});
