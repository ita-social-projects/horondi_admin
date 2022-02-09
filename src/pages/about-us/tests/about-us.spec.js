import React from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AboutUs from '../about-us';
import { theme } from '../../../components/app/app-theme/app.theme';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';

jest.mock('react-redux');

jest.mock('../about-us.styles', () => ({
  useStyles: () => ({})
}));

const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);

const themeValue = theme('light');

let wrapper;

describe('AboutUs component tests, ', () => {
  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <ThemeProvider theme={themeValue}>
          <AboutUs />
        </ThemeProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
    wrapper = null;
  });

  it('Component TableContainerRow should exist', () => {
    expect(wrapper.exists(TableContainerRow)).toBe(true);
  });

  it('Component button should exist', () => {
    expect(wrapper.exists(Button)).toBe(true);
  });

  it('Component TableContainerGenerator should exist', () => {
    expect(wrapper.exists(TableContainerGenerator)).toBe(true);
  });
});
