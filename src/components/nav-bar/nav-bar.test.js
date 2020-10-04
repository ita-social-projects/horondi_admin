import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from '../../store/store';
import Navbar from './nav-bar';
import { config } from '../../configs';

const store = configureStore();

describe('nav bar tests', () => {
  const wrapper = render(
    <Provider store={store}>
      <Navbar />
    </Provider>
  );
  it('should exist', () => {
    screen.debug();
    expect(wrapper.getByText(config.app.title)).toBeDefined();
    expect(wrapper.getByText(config.app.title)).not.toBeNull();
  });
});
