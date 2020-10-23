import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from '../../store/store';
import Navbar from './nav-bar';
import { config } from '../../configs';

const store = configureStore();

Enzyme.configure({ adapter: new Adapter() });

describe('nav bar tests', () => {
  const mockCallBack = jest.fn(() => {});
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
