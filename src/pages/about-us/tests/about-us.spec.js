import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import {
  aboutUsPageDataMock,
  enTitle,
  firstSectionEnTitle,
  imgLabel
} from './about-us.variables';
import AboutUs from '../about-us';
import AboutUsTitleEdit from '../about-us-title-edit';
import AboutUsSectionEdit from '../about-us-section-edit';
import AboutUsFooterImgEdit from '../about-us-footer-img-edit';
import AboutUsSectionAdd from '../about-us-section-add';
import { theme } from '../../../components/app/app-theme/app.theme';
import { config } from '../../../configs';

const { routes } = config;
const { ADD_ABOUT_US_SECTION } = config.buttonTitles;

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
                path={routes.pathToAboutUsAddSection}
                exact
                component={AboutUsSectionAdd}
              />
              <Route
                path={routes.pathToAboutUsTitleEdit}
                exact
                component={AboutUsTitleEdit}
              />
              <Route
                path={routes.pathToAboutUsSectionEdit}
                exact
                render={({ match }) => (
                  <AboutUsSectionEdit id={match.params.id} />
                )}
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

  it('Add button for adding new section successfully navigates to AboutUsAddSection page on click', async () => {
    const addSectionBtn = await screen.findByText(ADD_ABOUT_US_SECTION);
    fireEvent.click(addSectionBtn);
    expect(await screen.findByText(imgLabel)).toBeInTheDocument();
  });

  it('Edit button for editing title successfully navigates to AboutUsTitleEdit page on click', async () => {
    const editButtons = await screen.findAllByTestId('edit-btn');
    const titleEditButton = editButtons[0];
    fireEvent.click(titleEditButton);
    expect(await screen.findByText(enTitle)).toBeInTheDocument();
  });

  it('Edit button for editing section successfully navigates to AboutUsSectionEdit page on click', async () => {
    const editButtons = await screen.findAllByTestId('edit-btn');
    const sectionEditButton = editButtons[1];
    fireEvent.click(sectionEditButton);
    expect(await screen.findByText(firstSectionEnTitle)).toBeInTheDocument();
  });

  it('Edit button for editing section successfully navigates to AboutUsFooterImgEdit page on click', async () => {
    const editButtons = await screen.findAllByTestId('edit-btn');
    const footerImgEditButton = editButtons[4];
    fireEvent.click(footerImgEditButton);
    expect(await screen.findByText(imgLabel)).toBeInTheDocument();
  });
});
