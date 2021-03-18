import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import * as reactRedux from 'react-redux';
import { useDispatch as useDispatchMock } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Categories from '../categories';
import LoadingBar from '../../../components/loading-bar';
import StandardButton from '../../../components/buttons/standard-button';
import FilterNavbar from '../../../components/filter-search-sort';
import TableContainerGenerator from '../../../containers/table-container-generator';
import CategoryDeleteDialog from '../category-delete-dialog';
import { config } from '../../../configs';
import useCategoryFilters from '../../../hooks/filters/use-category-filters';
import TableContainerRow from '../../../containers/table-container-row';

const { ADD_CATEGORY } = config.buttonTitles;
const { mainPageTitle } = config.titles.categoryPageTitles;

Enzyme.configure({ adapter: new Adapter() });

const mockStore = {
  Categories: {
    filter: { _id: [], search: '' },
    categoriesLoading: false,
    categories: [
      {
        _id: '6043be593e06ad3edcdb7b2f',
        code: 'accessories',
        name: [
          { lang: 'ua', value: 'Аксесуари' },
          { lang: 'en', value: 'Accessories' }
        ],
        images: {
          large: 'large_9s7xejckm65k203_129210847.jpg',
          medium: 'medium_9s7xejckm65k203_129210847.jpg',
          small: 'small_9s7xejckm65k203_129210847.jpg',
          thumbnail: 'thumbnail_9s7xejckm65k203_129210847.jpg'
        },
        available: null
      },
      {
        _id: '6043bdeb3e06ad3edcdb7b2d',
        code: 'backpacks',
        name: [
          { lang: 'ua', value: 'Рюкзаки' },
          { lang: 'en', value: 'Backpacks' }
        ],
        images: {
          large: 'large_id73cf0kly0f5k7_230 (3).jpg',
          medium: 'medium_id73cf0kly0f5k7_230 (3).jpg',
          small: 'small_id73cf0kly0f5k7_230 (3).jpg',
          thumbnail: 'thumbnail_id73cf0kly0f5k7_230 (3).jpg'
        },
        available: null
      },
      {
        _id: '6043be253e06ad3edcdb7b2e',
        code: 'bags',
        name: [
          { lang: 'ua', value: 'Сумки' },
          { lang: 'en', value: 'Bags' }
        ],
        images: {
          large: 'large_id73cf0kly0ge87_204 (1).jpg',
          medium: 'medium_id73cf0kly0ge87_204 (1).jpg',
          small: 'small_id73cf0kly0ge87_204 (1).jpg',
          thumbnail: 'thumbnail_id73cf0kly0ge87_204 (1).jpg'
        },
        available: null
      }
    ],
    sort: { name: 1 },
    currentPage: 0,
    rowsPerPage: 10
  },
  Table: {
    pagination: {
      currentPage: 0,
      rowsPerPage: 10
    }
  }
};

jest.mock('../../../hooks/filters/use-category-filters');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector) => selector(mockStore),
  useDispatch: () => jest.fn()
}));

describe('Categories test', () => {
  jest.spyOn(reactRedux, 'useDispatch');
  let wrapper;

  it('Should render Categories page', () => {
    wrapper = mount(<Categories />);
    expect(wrapper).toBeDefined();
  });

  it(`Should render Typography with "${mainPageTitle}" label`, () => {
    wrapper = mount(<Categories />);
    expect(wrapper.exists(Typography)).toBe(true);
    expect(wrapper.find(Typography).text()).toBe(mainPageTitle);
  });

  it(`Should render add category button with "${ADD_CATEGORY}" label`, () => {
    wrapper = mount(<Categories />);
    expect(wrapper.exists(StandardButton)).toBe(true);
    expect(wrapper.find(StandardButton).prop('title')).toBe(ADD_CATEGORY);
  });

  it('Should render FilterNavbar', () => {
    wrapper = mount(<Categories />);
    expect(wrapper.exists(FilterNavbar)).toBe(true);
  });

  it('Should render TableContainerGenerator', () => {
    wrapper = mount(<Categories />);
    expect(wrapper.exists(TableContainerGenerator)).toBe(true);
  });

  it('Should render CategoryDeleteDialog', () => {
    wrapper = mount(<Categories />);
    expect(wrapper.exists(CategoryDeleteDialog)).toBe(true);
  });

  it('Should render LoadingBar', () => {
    mockStore.Categories.categoriesLoading = true;
    wrapper = mount(<Categories />);
    mockStore.Categories.categoriesLoading = false;
    expect(wrapper.exists(LoadingBar)).toBe(true);
  });

  it('Should render when category options equal null', () => {
    useCategoryFilters.mockImplementationOnce(() => null);
    wrapper = mount(<Categories />);
    expect(wrapper).toBeDefined();
  });

  it('Should handle click the Add category button', () => {
    const mockHolder = jest.fn();
    useDispatchMock.mockReturnValue(mockHolder);
    wrapper = mount(<Categories />);
    wrapper.find(StandardButton).simulate('click');
    expect(mockHolder.mock.calls.length).toEqual(2);
  });

  it('Should handle click the Delete category button', () => {
    const mockHolder = jest.fn();
    useDispatchMock.mockReturnValue(mockHolder);
    wrapper = mount(<Categories />);
    wrapper.find(TableContainerRow).at(0).props().deleteHandler();
    expect(mockHolder).toHaveBeenCalledTimes(3);
  });

  it('Should handle click the Edit category button', () => {
    const mockHolder = jest.fn();
    useDispatchMock.mockReturnValue(mockHolder);
    wrapper = mount(<Categories />);
    wrapper.find(TableContainerRow).at(0).props().editHandler();
    expect(mockHolder).toHaveBeenCalledTimes(2);
  });
});
