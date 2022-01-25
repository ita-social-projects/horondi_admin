import React from 'react';
import { render } from 'react-dom';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import MaterialAbout from '../material-about';
import { theme } from '../../../components/app/app-theme/app.theme';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';

jest.mock('react-redux');
jest.mock('@apollo/client');
jest.mock('../material-page.styles', () => ({
  useStyles: () => ({})
}));

const themeValue = theme('light');
const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);

let wrapper;

describe('MaterialAbout component tests, ', () => {
  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <ThemeProvider theme={themeValue}>
          <MaterialAbout />
        </ThemeProvider>
      </BrowserRouter>
    );
  });
  afterEach(() => {
    jest.restoreAllMocks();
    wrapper = null;
  });

  it('Should render AboutMaterial', () => {
    expect(wrapper).toBeDefined();
  });
  it('Component TableContainerRow should exist', () => {
    expect(wrapper.exists(TableContainerRow)).toBe(true);
  });
  it('Component TableContainerGenerator should exist', () => {
    expect(wrapper.exists(TableContainerGenerator)).toBe(true);
  });
});
