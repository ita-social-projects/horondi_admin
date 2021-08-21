import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import { useDispatch as useDispatchMock } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import * as reactRedux from 'react-redux';
import Categories from '../../categories/categories';
import LoadingBar from '../../../components/loading-bar';
import StandardButton from '../../../components/buttons/standard-button';
import FilterNavbar from '../../../components/filter-search-sort';
import TableContainerGenerator from '../../../containers/table-container-generator';
import CategoryDeleteDialog from '../../categories/category-delete-dialog';
import useCategoryFilters from '../../../hooks/filters/use-category-filters';
import TableContainerRow from '../../../containers/table-container-row';
import { config } from '../../../configs';
import variables from './variables';

const { ADD_CATEGORY } = config.buttonTitles;
const { mainPageTitle } = config.titles.categoryPageTitles;

const mockStore = variables;
Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../../hooks/filters/use-category-filters');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector) => selector(mockStore),
  useDispatch: () => jest.fn()
}));

describe('Categories test', () => {
  jest.spyOn(reactRedux, 'useDispatch');
  const mockHolder = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Categories />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should render Categories page', () => {
    expect(wrapper).toBeDefined();
  });

  it(`Should render Typography with "${mainPageTitle}" label`, () => {
    expect(wrapper.exists(Typography)).toBe(true);
    expect(wrapper.find(Typography).text()).toBe(mainPageTitle);
  });

  it(`Should render add category button with "${ADD_CATEGORY}" label`, () => {
    expect(wrapper.exists(StandardButton)).toBe(true);
    expect(wrapper.find(StandardButton).prop('title')).toBe(ADD_CATEGORY);
  });

  it('Should render FilterNavbar', () => {
    expect(wrapper.exists(FilterNavbar)).toBe(true);
  });

  it('Should render TableContainerGenerator', () => {
    expect(wrapper.exists(TableContainerGenerator)).toBe(true);
  });

  it('Should render CategoryDeleteDialog', () => {
    expect(wrapper.exists(CategoryDeleteDialog)).toBe(true);
  });

  it('Should render LoadingBar', () => {
    mockStore.Categories.categoriesLoading = true;
    wrapper = mount(<Categories />);
    mockStore.Categories.categoriesLoading = false;
    expect(wrapper.exists(LoadingBar)).toBe(false);
  });

  it('Should render when category options equal null', () => {
    useCategoryFilters.mockImplementationOnce(() => null);
    expect(wrapper).toBeDefined();
  });

  it('Should handle click the Add category button', () => {
    useDispatchMock.mockReturnValue(mockHolder);
    wrapper = mount(<Categories />);
    wrapper.find(StandardButton).simulate('click');
    expect(mockHolder.mock.calls.length).toEqual(2);
  });

  it('Should handle click the Delete category button', () => {
    useDispatchMock.mockReturnValue(mockHolder);
    wrapper.find(TableContainerRow).at(0).props().deleteHandler();
    expect(mockHolder).toHaveBeenCalledTimes(5);
  });

  it('Should handle click the Edit category button', () => {
    useDispatchMock.mockReturnValue(mockHolder);
    wrapper.find(TableContainerRow).at(0).props().editHandler();
    expect(mockHolder).toHaveBeenCalledTimes(7);
  });
});
