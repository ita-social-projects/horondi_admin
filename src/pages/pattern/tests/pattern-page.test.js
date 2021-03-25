import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import { variables } from './variables';

import PatternPage from '../pattern-page';
import { config } from '../../../configs';

const { CREATE_PATTERN_TITLE } = config.buttonTitles;

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

    console.log(wrapper.find(Button).props());
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('Does page render', () => {
    expect(wrapper).toBeDefined();
  });

  test(`Should render Typography with "${config.titles.patternTitles.mainPageTitle}" label`, () => {
    expect(wrapper.exists(Typography)).toBe(true);
    expect(wrapper.find(Typography).text()).toBe(
      config.titles.patternTitles.mainPageTitle
    );
  });

  test(`Should render CREATE_PATTERN_TITLE button with "${CREATE_PATTERN_TITLE}" label`, () => {
    expect(wrapper.exists(Button)).toBe(true);
    expect(wrapper.find(Button).prop('children')).toBe(CREATE_PATTERN_TITLE);
  });
});

// // describe('Categories test', () => {
// //   jest.spyOn(reactRedux, 'useDispatch');
// //   const mockHolder = jest.fn();
//   let wrapper;

//   beforeEach(() => {
//     wrapper = mount(<Categories />);
//   });

//   afterEach(() => {
//     wrapper.unmount();
//   });

//   it('Should render Categories page', () => {
//     expect(wrapper).toBeDefined();
//   });

//   it(`Should render Typography with "${mainPageTitle}" label`, () => {
//     expect(wrapper.exists(Typography)).toBe(true);
//     expect(wrapper.find(Typography).text()).toBe(mainPageTitle);
//   });

//   it(`Should render add category button with "${ADD_CATEGORY}" label`, () => {
//     expect(wrapper.exists(StandardButton)).toBe(true);
//     expect(wrapper.find(StandardButton).prop('title')).toBe(ADD_CATEGORY);
//   });

//   it('Should render FilterNavbar', () => {
//     expect(wrapper.exists(FilterNavbar)).toBe(true);
//   });

//   it('Should render TableContainerGenerator', () => {
//     expect(wrapper.exists(TableContainerGenerator)).toBe(true);
//   });

//   it('Should render CategoryDeleteDialog', () => {
//     expect(wrapper.exists(CategoryDeleteDialog)).toBe(true);
//   });

//   it('Should render LoadingBar', () => {
//     mockStore.Categories.categoriesLoading = true;
//     wrapper = mount(<Categories />);
//     mockStore.Categories.categoriesLoading = false;
//     expect(wrapper.exists(LoadingBar)).toBe(true);
//   });

//   it('Should render when category options equal null', () => {
//     useCategoryFilters.mockImplementationOnce(() => null);
//     expect(wrapper).toBeDefined();
//   });

//   it('Should handle click the Add category button', () => {
//     useDispatchMock.mockReturnValue(mockHolder);
//     wrapper = mount(<Categories />);
//     wrapper.find(StandardButton).simulate('click');
//     expect(mockHolder.mock.calls.length).toEqual(2);
//   });

//   it('Should handle click the Delete category button', () => {
//     useDispatchMock.mockReturnValue(mockHolder);
//     wrapper.find(TableContainerRow).at(0).props().deleteHandler();
//     expect(mockHolder).toHaveBeenCalledTimes(5);
//   });

//   it('Should handle click the Edit category button', () => {
//     useDispatchMock.mockReturnValue(mockHolder);
//     wrapper.find(TableContainerRow).at(0).props().editHandler();
//     expect(mockHolder).toHaveBeenCalledTimes(7);
//   });
// });
