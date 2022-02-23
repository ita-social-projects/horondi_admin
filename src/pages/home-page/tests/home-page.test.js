import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as redux from 'react-redux';
import LoadingBar from '../../../components/loading-bar';
import HomePageEdit from '../index';

import titles from '../../../configs/titles';

const { homePageTitles } = titles;

Enzyme.configure({ adapter: new Adapter() });

const initialState = {
  HomePage: {
    photos: [{ _id: '1111111111', images: { small: 'test' } }],
    homePageLoading: false,
    homePageError: null
  }
};

const mockStore = initialState;

const onPhotoUpdateMock = jest.fn();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => jest.fn(),
  useDispatch: () => mockDispatch
}));

describe('Home page tests', () => {
  const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
  const mockUseSelector = jest.spyOn(redux, 'useSelector');

  let wrapper;

  beforeEach(() => {
    mockUseDispatch.mockImplementation(() => jest.fn());
    mockUseSelector.mockImplementation((callback) => callback(mockStore));
    wrapper = mount(<HomePageEdit photoUpdateHandler={onPhotoUpdateMock} />);
  });

  afterEach(() => {
    wrapper.unmount();
    mockUseDispatch.mockClear();
    mockUseSelector.mockClear();
  });

  it('Component should exist', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('div[className*="container"]').first()).toBeTruthy();
  });

  it('Page should have title text', () => {
    expect(wrapper.find('[data-cy="homepage-title"]').first().text()).toEqual(
      homePageTitles.mainPageTitle
    );
  });

  it('Inputs should have type file', () => {
    expect(wrapper.find({ type: 'file' }).type()).toEqual('input');
    expect(wrapper.find({ type: 'file' }).simulate('click')).toEqual({});
  });

  it('Should display loading bar', () => {
    initialState.HomePage.homePageLoading = true;
    wrapper = mount(<HomePageEdit photoUpdateHandler={onPhotoUpdateMock} />);
    expect(wrapper.find(LoadingBar).length).toEqual(1);
  });
});
