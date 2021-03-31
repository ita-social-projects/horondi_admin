import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { BrowserRouter, Link } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import { variables } from './variables';

import PatternPage from '../pattern-page';
import LoadingBar from '../../../components/loading-bar';
import TableContainerGenerator from '../../../containers/table-container-generator';

import { config } from '../../../configs';

const { CREATE_PATTERN_TITLE } = config.buttonTitles;
const pathToPatternAddPage = config.routes.pathToAddPattern;

configure({ adapter: new Adapter() });
const mockStore = variables;
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector) => selector(mockStore),
  useDispatch: () => jest.fn()
}));

describe('Pattern-page tests', () => {
  jest.spyOn(reactRedux, 'useDispatch');
  const mockHolder = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <PatternPage />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('Does page render', () => {
    expect(wrapper).toBeDefined();
  });

  test(`Should render Typography component with "${config.titles.patternTitles.mainPageTitle}" label`, () => {
    expect(wrapper.exists(Typography)).toBe(true);
    expect(wrapper.find(Typography).text()).toBe(
      config.titles.patternTitles.mainPageTitle
    );
  });

  test(`Should render button component`, () => {
    expect(wrapper.exists(Button)).toBe(true);
    expect(wrapper.find(Button).text()).toBe(CREATE_PATTERN_TITLE);
    expect(wrapper.find(Button).prop('component')).toEqual(Link);
    expect(wrapper.find(Button).prop('to')).toBe(pathToPatternAddPage);
  });

  test('Should render LoadingBar', () => {
    mockStore.Pattern.patternLoading = true;
    wrapper = mount(
      <BrowserRouter>
        <PatternPage />
      </BrowserRouter>
    );
    mockStore.Pattern.patternLoading = false;
    expect(wrapper.exists(LoadingBar)).toBe(true);
  });

  test('Should render TableContainerGenerator', () => {
    expect(wrapper.exists(TableContainerGenerator)).toBe(true);
  });
});
