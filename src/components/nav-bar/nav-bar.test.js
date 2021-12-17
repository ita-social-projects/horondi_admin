import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '../../store/store';
import Navbar from './nav-bar';
import { config } from '../../configs';

const store = configureStore();

describe('nav bar tests', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );
  });
  afterEach(() => {
    component.unmount();
  });

  it('should exist', () => {
    expect(component.find(config.app.title)).toBeDefined();
    expect(component.find(config.app.title)).not.toBeNull();
  });
});
