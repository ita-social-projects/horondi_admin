import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import configureStore from '../../../store/store';
import HomePageEdit from '../index';

import titles from '../../../configs/titles';

const { homePageTitles } = titles;

Enzyme.configure({ adapter: new Adapter() });

describe('Home page tests', () => {
  let wrapper;
  const state = {
    loading: false,
    photos: [{ _id: '1111111111', images: { small: 'test' } }]
  };

  const onPhotoUpdateMock = jest.fn();
  const mockStore = configureStore([]);
  const store = mockStore(() => ({
    HomePage: { ...state }
  }));

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <HomePageEdit photoUpdateHandler={onPhotoUpdateMock} />
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Component should exist', () => {
    expect(wrapper.exists());
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
    state.loading = true;
    store.dispatch({ type: 'ANY_ACTION' });

    expect(wrapper.find('LoadingBar').length).toEqual(0);
  });
});
