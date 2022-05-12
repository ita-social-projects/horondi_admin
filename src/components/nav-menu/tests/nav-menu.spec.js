import React from 'react';
import * as reactRedux from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  Drawer,
  Divider,
  List,
  Badge,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import NavMenu from '../index';
import { mockedStore, mockedMenuCategories, mockWidth } from './variables';

const { homePage, clientsQuestions } = mockedMenuCategories;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector) => selector(mockedStore),
  useDispatch: () => jest.fn()
}));

describe('Nav menu test', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const mockHandleDrawerToggle = jest.fn();
  let wrapper;

  beforeEach(() => {
    useDispatchMock.mockReturnValue(mockHandleDrawerToggle);
    wrapper = mount(
      <Router>
        <NavMenu width={mockWidth} />
      </Router>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should render component', () => {
    expect(wrapper).toBeDefined();
  });

  it('Should render Drawer', () => {
    expect(wrapper.exists(Drawer)).toBe(true);
  });

  it('Should render Divider component', () => {
    expect(wrapper.exists(Divider)).toBe(true);
  });

  it('Should render List component', () => {
    expect(wrapper.exists(List)).toBe(true);
  });

  it('Should render ListItem component', () => {
    expect(wrapper.exists(ListItem)).toBe(true);
  });

  it('Should render ListItemIcon component', () => {
    expect(wrapper.exists(ListItemIcon)).toBe(true);
  });

  it('Should render Collapse component', () => {
    expect(wrapper.exists(Collapse)).toBe(true);
  });

  it('Should render ListItemText component and it should be string', () => {
    expect(typeof wrapper.find(ListItemText).at(0).text()).toBe('string');
  });

  it('Should render Badge component for Запитання покупців item', () => {
    wrapper.find(ListItemText).at(0).text() === clientsQuestions &&
      expect(wrapper.exists(Badge)).toBe(true);
  });

  it("Should be text 'Домашня сторінка'", () => {
    expect(wrapper.find(ListItemText).at(0).text()).toBe(homePage);
  });

  it('Should render ExpandLess when click on Клієнти', () => {
    wrapper.find(ListItem).at(8).invoke('onClick')();
    expect(wrapper.exists(ExpandLess)).toBe(true);
  });

  it('Should render ExpandLess when click on Каталог', () => {
    wrapper.find(ListItem).at(9).invoke('onClick')();
    expect(wrapper.exists(ExpandLess)).toBe(true);
  });

  it('Should render ExpandLess when click on Сертифікати', () => {
    wrapper.find(ListItem).at(10).invoke('onClick')();
    expect(wrapper.exists(ExpandLess)).toBe(true);
  });

  it('Should render ExpandLess when click on Конструктор', () => {
    wrapper.find(ListItem).at(11).invoke('onClick')();
    expect(wrapper.exists(ExpandLess)).toBe(true);
  });

  it('Should render ExpandLess when click on Статичні сторінки', () => {
    wrapper.find(ListItem).at(11).invoke('onClick')();
    expect(wrapper.exists(ExpandLess)).toBe(true);
  });

  it('Should render ExpandMore by default', () => {
    expect(wrapper.exists(ExpandMore)).toBe(true);
  });

  it('Should handle click on ListItem component', () => {
    wrapper.find(ListItem).at(0).invoke('onClick')();
    expect(mockHandleDrawerToggle).toHaveBeenCalledTimes(2);
  });
  it('Should handle close Drawer', () => {
    wrapper.find(Drawer).prop('onClose')();
    expect(mockHandleDrawerToggle).toHaveBeenCalledTimes(1);
  });
});
