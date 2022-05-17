import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Provider } from 'react-redux';
import { businessPage } from '../../../../pages/about-us/tests/about-us.variables';
import { sectionEditMocks } from './variables';
import AboutUsSectionEditForm from '../about-us-section-edit-form';
import DialogWindow from '../../../dialog-window';
import SnackbarItem from '../../../snackbar';
import { config } from '../../../../configs';
import configureStore from '../../../../store/store';

const { SAVE_TITLE, YES_BUTTON } = config.buttonTitles;
const { SUCCESS_UPDATE_STATUS } = config.statuses;
const { titleEditInput } = config.labels.aboutUs;

const store = configureStore();

jest.mock('react-router', () => ({
  useParams: jest
    .fn()
    .mockReturnValue({ id: '8aa1162e-cac7-11ec-9d64-0242ac120002' }),
  useHistory: jest.fn().mockReturnValue({ push: jest.fn() })
}));

jest.mock('../../../../hooks/form-dialog/use-unsaved-changes-handler', () => ({
  useUnsavedChangesHandler: (values) => () => ''
}));

describe('AboutUsSectionEditForm component tests', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={sectionEditMocks} addTypename={false}>
        <Provider store={store}>
          <AboutUsSectionEditForm businessPage={businessPage} />
          <DialogWindow />
          <SnackbarItem />
        </Provider>
      </MockedProvider>
    );
  });

  it('Edit title works correctly', async () => {
    const firstTitleInput = screen.getByLabelText(titleEditInput.label.ua);
    fireEvent.change(firstTitleInput, { target: { value: 'Щось' } });
    const saveBtn = screen.getByText(SAVE_TITLE);
    fireEvent.click(saveBtn);
    const yesBtn = await screen.findByText(YES_BUTTON);
    fireEvent.click(yesBtn);
    const successSnackbar = await screen.findByText(SUCCESS_UPDATE_STATUS);
    expect(successSnackbar).toBeInTheDocument();
  });
});
