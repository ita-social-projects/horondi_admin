import React from 'react';
import 'mutationobserver-shim';
import * as redux from 'react-redux';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Paper, TextField, Select, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LanguagePanel from '../../language-panel';
import ImageUploadContainer from '../../../../containers/image-upload-container';

import ModelForm from '../index';
import {
  mockId,
  mockIsEdit,
  mockModel,
  mockValues,
  Sizes,
  Categories
} from './model-form.variables';
import { BackButton, SaveButton } from '../../../buttons';
import CheckboxOptions from '../../../checkbox-options';

React.useLayoutEffect = React.useEffect;

configure({ adapter: new Adapter() });

const mockHandleSubmit = jest.fn();
const mockSetFieldValue = jest.fn();
const mockHandleChange = jest.fn();
const mockHandleBlur = jest.fn();

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: mockValues,
    handleSubmit: mockHandleSubmit,
    handleChange: mockHandleChange,
    handleBlur: mockHandleBlur,
    touched: {},
    errors: {},
    setFieldValue: mockSetFieldValue
  })
}));

const mockCreateModel = jest.fn();
const mockSetUpload = jest.fn();
const mockSetModelImage = jest.fn();

jest.mock('../../../../utils/use-model-handlers', () => ({
  __esModule: true,
  default: () => ({
    createModel: mockCreateModel,
    setUpload: mockSetUpload,
    upload: '',
    modelImage: '',
    setModelImage: mockSetModelImage
  })
}));

const mockModelFormOnSubmit = jest.fn();
const mockUseFormikInitialValues = jest.fn();
const mockUpdateModelHandler = jest.fn();
const mockLoadHelper = jest.fn();

jest.mock('../../../../utils/model-form', () => ({
  __esModule: true,
  modelFormOnSubmit: () => mockModelFormOnSubmit(),
  useFormikInitialValues: () => mockUseFormikInitialValues(),
  updateModelHandler: () => mockUpdateModelHandler(),
  loadHelper: () => mockLoadHelper()
}));

const mockHandleImageLoad = jest.fn();

jest.spyOn(global, 'FileReader').mockImplementation(() => {
  this.readAsDataURL = jest.fn();
  this.onload = jest.fn();
});

describe('Model-form tests', () => {
  const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
  const mockUseEffect = jest.spyOn(React, 'useEffect');
  const mockUseSelector = jest.spyOn(redux, 'useSelector');

  let wrapper;

  const mockStore = {
    sizesList: Sizes.list,
    categories: Categories.categories
  };

  beforeEach(() => {
    mockUseDispatch.mockImplementation(() => jest.fn());
    mockUseEffect.mockImplementation(() => jest.fn());
    mockUseSelector.mockReturnValue(mockStore);

    wrapper = shallow(
      <ModelForm model={mockModel} id={mockId} isEdit={mockIsEdit} />
    );
  });

  afterEach(() => {
    wrapper.unmount();

    mockUseDispatch.mockClear();
    mockUseEffect.mockClear();
    mockUseSelector.mockClear();
  });

  it('should render Model-Form component', () => {
    expect(wrapper).toBeDefined();
  });

  it('Should render component form', () => {
    expect(wrapper.exists('form')).toBe(true);
  });

  it(' should call useEffect twice', () => {
    expect(mockUseEffect).toHaveBeenCalledTimes(2);
  });

  it(' should call useSelector twice', () => {
    expect(mockUseSelector).toHaveBeenCalledTimes(2);
  });

  it(' should call useDispatch once', () => {
    expect(mockUseDispatch).toHaveBeenCalledTimes(1);
  });

  it('should find buttons', () => {
    expect(wrapper.find(BackButton)).toHaveLength(1);
    expect(wrapper.find(SaveButton)).toHaveLength(1);
    if (mockIsEdit) {
      expect(wrapper.find(Button)).toHaveLength(1);
    }
  });

  it('should find checkboxes', () => {
    expect(wrapper.find('CheckboxOptions')).toHaveLength(2);
  });

  it('should find inputs', () => {
    expect(wrapper.find(Paper)).toHaveLength(1);
  });

  it('should find inputs', () => {
    expect(wrapper.find(TextField)).toHaveLength(1);
  });

  it('should find 2 Language panels', () => {
    expect(wrapper.find(LanguagePanel)).toHaveLength(2);
  });

  it('should find Image Container', () => {
    expect(wrapper.find(ImageUploadContainer)).toHaveLength(1);
  });

  it('should simulate change event', () => {
    wrapper.find(TextField).at(0).simulate('change');
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  it('Should simulate blur event', () => {
    wrapper.find(LanguagePanel).at(0).simulate('blur');
    expect(mockHandleBlur).toHaveBeenCalledTimes(1);
  });

  it('Should simulate submit button', () => {
    wrapper.find(SaveButton).prop('onClickHandler')();
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('should call handle constructor', () => {
    wrapper.find(Button).at(0).simulate('click');
    expect(mockUseDispatch).toHaveBeenCalledTimes(1);
  });

  it('should call setFieldValue select', () => {
    wrapper
      .find(Select)
      .simulate('change', { target: { value: 'accessories' } });
    expect(mockSetFieldValue).toHaveBeenCalledWith('category', 'accessories');
  });

  it('should call setFieldValue for checkbox', () => {
    wrapper.find(CheckboxOptions).at(0).simulate('click');
    expect(mockSetFieldValue).toHaveBeenCalled();
  });

  // it('should call setFieldValue for Autocomplete', () => {
  //   wrapper.find(Autocomplete).prop('onChange', [Sizes.list[3]])()
  //   expect(mockSetFieldValue).toHaveBeenCalledWith('sizes', [Sizes.list[0]._id]);
  // })

  it('should simulate upload the image', () => {
    wrapper
      .find(ImageUploadContainer)
      .at(0)
      .prop('handler', {
        target: {
          files: [new File([], 'foo,png', { type: 'image' })]
        }
      });

    expect(mockHandleImageLoad).toHaveBeenCalledTimes(1);
    // expect(mockSetUpload).toHaveBeenCalledWith(event.target.files[0]);
  });

  // it('Should test FileReader ', () => {
  //   const reader = FileReader.mock.instances[0];
  //   reader.onload({ target: { result: 'foo' } });
  //   expect(reader.readAsDataURL).toHaveBeenCalled();
  //   expect(reader.readAsDataURL).toHaveBeenCalledWith(new File([], 'foo,png', { type: 'image' }));
  // });

  // it('Should upload image', () => {
  //   const imageContainer = wrapper.find(ImageUploadContainer);
  //   imageContainer.props('handler').handler(event);
  //   expect(mockSetUpload).toHaveBeenCalledTimes(1);
  //   expect(mockSetUpload).toHaveBeenCalledWith(event.target.files[0]);
  // });
});
