import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../../../app/app-theme/app.theme';
import MaterialAboutAddForm from '../material-about-add-form';
import {
  mockMaterialAboutBlock,
  target,
  files
} from './material-about-add-form.variables';
import FileReaderMock from '../../../../../__mocks__/fileReaderMock';
import ImageUploadContainer from '../../../../containers/image-upload-container';

const mockOpenSuccessSnackbar = jest.fn();
const mockHistoryPush = jest.fn();
const mockOnEditorChange = jest.fn();
const dispatch = jest.fn();

jest.mock('react-redux');
jest.mock('../../../../utils/use-success-snackbar', () => ({
  __esModule: true,
  default: () => ({
    openSuccessSnackbar: mockOpenSuccessSnackbar
  })
}));
jest.mock('../../../../hooks/form-dialog/use-unsaved-changes-handler');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));
jest.mock('../../../editor', () => ({
  __esModule: true,
  default: function FuncEditor() {
    return <div className='editor' onEditorChange={mockOnEditorChange} />;
  }
}));

const themeValue = theme('light');
const fileReader = new FileReaderMock();
jest.spyOn(window, 'FileReader').mockImplementation(() => fileReader);

useDispatch.mockImplementation(() => dispatch);

describe('MaterialAboutAddForm component tests, ', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <BrowserRouter>
        <MockedProvider mocks={mockMaterialAboutBlock} addTypename={false}>
          <ThemeProvider theme={themeValue}>
            <MaterialAboutAddForm currentType='bottom' />
          </ThemeProvider>
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('Should render buttons and form', async () => {
    expect(component.find('button')).toHaveLength(2);
    expect(component.find('form')).toHaveLength(1);
  });

  it('should render ImageUploadPreviewContainer component', () => {
    const wrapper = component.find(ImageUploadContainer);

    expect(wrapper.exists(ImageUploadContainer)).toBeDefined();
  });

  it('Should upload image', async () => {
    const imageContainer = component.find(ImageUploadContainer);
    const handler = imageContainer.prop('handler');
    handler(files);

    fileReader.onload(target);
    expect(fileReader.readAsDataURL).toHaveBeenCalled();
    expect(fileReader.readAsDataURL).toHaveBeenCalledWith(files[0]);
  });

  it('Should click back-page button', () => {
    const btn = component.find('button').first();
    btn.simulate('click');

    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  });
});
