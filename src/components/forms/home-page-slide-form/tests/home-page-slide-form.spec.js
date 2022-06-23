import { mount } from 'enzyme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import HomePageSlideForm from '../home-page-slide-form';
import { theme } from '../../../app/app-theme/app.theme';
import {
  CREATE_SLIDE_TITLE,
  SAVE_TITLE,
  slideId,
  slideOrder,
  withId,
  withoutId
} from './home-page-slide-form.variables';

jest.mock('react-redux');
jest.mock('connected-react-router', () => ({
  push: jest.fn()
}));

const themeValue = theme('light');
const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);

describe('component home-page-slider button name tests', () => {
  let wrapper = null;

  wrapper = mount(
    <BrowserRouter>
      <ThemeProvider theme={themeValue}>
        <HomePageSlideForm
          slide={withId}
          id={slideId}
          slideOrder={slideOrder}
        />
      </ThemeProvider>
    </BrowserRouter>
  );

  it(`Should render save button with ${SAVE_TITLE} label`, () => {
    expect(wrapper.find('button').at(1).text()).toBe(SAVE_TITLE);
  });
});

describe('component tests without id', () => {
  let wrapper = null;

  wrapper = mount(
    <BrowserRouter>
      <ThemeProvider theme={themeValue}>
        <HomePageSlideForm
          slide={withoutId}
          id={slideId}
          slideOrder={slideOrder}
        />
      </ThemeProvider>
    </BrowserRouter>
  );

  it(`Should render save button with ${CREATE_SLIDE_TITLE} label`, () => {
    expect(wrapper.find('button').at(1).text()).toBe(CREATE_SLIDE_TITLE);
  });
});
