import React from 'react';
import * as redux from 'react-redux';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ImageUploadPreviewContainer from '../../../../containers/image-upload-container/image-upload-previewContainer';

import NewsForm from '../index';
import { mockId, mockNewsArticle, mockEditMode } from './news-form.variables';
import LanguagePanel from '../../language-panel';
import { SaveButton } from '../../../buttons';

configure({ adapter: new Adapter() });

const mockHandleSubmit = jest.fn();
const mockImageHandler = jest.fn();

jest.mock('../../../../utils/contacts-form', () => ({
  __esModule: true,
  setMapImageHandler: () => mockImageHandler()
}));
jest.mock('../../../../hooks/form-dialog/use-unsaved-changes-handler', () => ({
  useUnsavedChangesHandler: () => null
}));
jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: {
      authorPhoto: 'a',
      newsImage: 'd',
      uaAuthorName: 'q',
      enAuthorName: 'w',
      uaTitle: 'e',
      enTitle: 'r',
      uaText: 't',
      enText: 'y'
    },
    handleSubmit: mockHandleSubmit,
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    touched: {},
    errors: {}
  })
}));

describe('NewsForm tests', () => {
  const mockUseEffect = jest.spyOn(React, 'useEffect');
  const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
  const mockUseSelector = jest.spyOn(redux, 'useSelector');
  let wrapper;

  beforeEach(() => {
    mockUseEffect.mockImplementation(() => jest.fn());
    mockUseDispatch.mockImplementation(() => jest.fn());
    mockUseSelector.mockReturnValue({ loading: true });

    wrapper = shallow(
      <NewsForm
        id={mockId}
        newsArticle={mockNewsArticle}
        editMode={mockEditMode}
      />
    );
  });

  afterEach(() => {
    mockUseEffect.mockClear();
    mockUseDispatch.mockClear();
    mockUseSelector.mockClear();

    wrapper.unmount();
  });

  it('Called mockImageHandler in first component', () => {
    wrapper
      .find(ImageUploadPreviewContainer)
      .at(0)
      .props()
      .handler({ target: 'a' });
    expect(mockImageHandler).toHaveBeenCalled();
  });

  it('Called mockImageHandler in second component', () => {
    wrapper
      .find(ImageUploadPreviewContainer)
      .at(1)
      .props()
      .handler({ target: 'a' });
    expect(mockImageHandler).toHaveBeenCalled();
  });

  it('UseEffect hook shoud render two times', () => {
    expect(mockUseEffect).toHaveBeenCalledTimes(2);
  });

  it('UseDispatch hook shoud render one time', () => {
    expect(mockUseDispatch).toHaveBeenCalledTimes(1);
  });

  it('Should render LanguagePanel component two times', () => {
    expect(wrapper.find(LanguagePanel)).toHaveLength(2);
  });

  it('Should simulate submit button', () => {
    wrapper.find(SaveButton).prop('onClickHandler')();
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('Should render component form', () => {
    expect(wrapper.exists('form')).toBe(true);
  });
});
