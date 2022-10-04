import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import {
  aboutUsPageDataMock,
  enTitle,
  imgLabel,
  aboutUsPageDataWithoutImage,
  businessPage,
  deleteFilesFromSectionVariables
} from './about-us.variables';
import AboutUs from '../about-us';
import AboutUsTitleEdit from '../about-us-title-edit';
import AboutUsFooterImgEdit from '../about-us-footer-img-edit';
import { theme } from '../../../components/app/app-theme/app.theme';
import { config } from '../../../configs';
import { getImageNamesFromSection } from '../../../utils/about-us-helper';

const { routes } = config;

jest.mock('react-redux');
jest.mock('../about-us.styles', () => ({
  useStyles: () => ({})
}));

const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);

const themeValue = theme('light');

describe('AboutUs component tests', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={aboutUsPageDataMock} addTypename={false}>
        <MemoryRouter initialEntries={[routes.pathToAboutUs]}>
          <ThemeProvider theme={themeValue}>
            <Switch>
              <Route path={routes.pathToAboutUs} exact component={AboutUs} />
              <Route
                path={routes.pathToAboutUsTitleEdit}
                exact
                component={AboutUsTitleEdit}
              />
              <Route
                path={routes.pathToAboutUsFooterImgEdit}
                exact
                component={AboutUsFooterImgEdit}
              />
            </Switch>
          </ThemeProvider>
        </MemoryRouter>
      </MockedProvider>
    );
  });

  it('Edit button for editing title successfully navigates to AboutUsTitleEdit page on click', async () => {
    const editButtons = await screen.findAllByTestId('edit_btn');
    const titleEditButton = editButtons[0];
    fireEvent.click(titleEditButton);
    expect(await screen.findByText(enTitle)).toBeInTheDocument();
  });

  it('Edit button for editing section successfully navigates to AboutUsFooterImgEdit page on click', async () => {
    const editButtons = await screen.findAllByTestId('edit_btn');
    const footerImgEditButton = editButtons[4];
    fireEvent.click(footerImgEditButton);
    expect(await screen.findByText(imgLabel)).toBeInTheDocument();
  });
});
describe('AboutUs component tests without data', () => {
  it('should render loader', async () => {
    render(
      <MockedProvider mocks={null} addTypename={false}>
        <MemoryRouter initialEntries={[routes.pathToAboutUs]}>
          <ThemeProvider theme={themeValue}>
            <AboutUs />
          </ThemeProvider>
        </MemoryRouter>
      </MockedProvider>
    );
    const loader = await screen.findByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
  it('should render loader', async () => {
    render(
      <MockedProvider mocks={aboutUsPageDataWithoutImage} addTypename={false}>
        <MemoryRouter initialEntries={[routes.pathToAboutUs]}>
          <ThemeProvider theme={themeValue}>
            <AboutUs />
          </ThemeProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    const loader = await screen.findByTestId('loader');
    expect(loader).not.toBeInTheDocument();
  });
  it('shoud get all names for image', () => {
    const { id } = businessPage.sectionsImgs[0];
    const result = getImageNamesFromSection(businessPage, id);
    expect(result).toEqual(deleteFilesFromSectionVariables.fileNames);
  });
});
