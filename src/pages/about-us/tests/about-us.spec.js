import React from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
<<<<<<< HEAD
<<<<<<< HEAD
import { Button } from '@material-ui/core';
=======
>>>>>>> c2197c98 (draft)
=======
import { Button } from '@material-ui/core';
>>>>>>> c797db05 (fix container row default props)
import AboutUs from '../about-us';
import { theme } from '../../../components/app/app-theme/app.theme';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';

jest.mock('react-redux');
<<<<<<< HEAD

=======
jest.mock('@apollo/client');
>>>>>>> c2197c98 (draft)
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
<<<<<<< HEAD

=======
>>>>>>> c2197c98 (draft)
  afterEach(() => {
    jest.restoreAllMocks();
    wrapper = null;
  });

<<<<<<< HEAD
  it('Component TableContainerRow should exist', () => {
    expect(wrapper.exists(TableContainerRow)).toBe(true);
  });

  it('Component button should exist', () => {
    expect(wrapper.exists(Button)).toBe(true);
  });

=======
  it('Should render AboutUs', () => {
    expect(wrapper).toBeDefined();
  });
  it('Component TableContainerRow should exist', () => {
    expect(wrapper.exists(TableContainerRow)).toBe(true);
  });
<<<<<<< HEAD
>>>>>>> c2197c98 (draft)
=======
  it('Component button should exist', () => {
    expect(wrapper.exists(Button)).toBe(true);
  });
>>>>>>> c797db05 (fix container row default props)
  it('Component TableContainerGenerator should exist', () => {
    expect(wrapper.exists(TableContainerGenerator)).toBe(true);
  });
});
