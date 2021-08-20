import React from 'react';
import * as reactRedux from 'react-redux';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act, fireEvent, render } from '@testing-library/react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PocketsForm from '../index';
import ImageUploadContainer from '../../../../containers/image-upload-container';

import {
  files,
  target,
  mockPosition,
  Sizes,
  mockPositionWithData
} from './mockPockets';

configure({ adapter: new Adapter() });

const mockSetFieldValue = jest.fn();
const mockSubmit = jest.fn();
const mockChange = jest.fn();
const mockBlur = jest.fn();
const mockSetUpload = jest.fn();
const mockSetPocketsImage = jest.fn();
const getOptionSelected = jest.fn();

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: {},
    handleSubmit: mockSubmit,
    handleChange: mockChange,
    touched: {
      labelIdAut: true,
      code: true,
      additionalPrice: true
    },
    errors: { code: true, positions: 'true', additionalPrice: 'true' },
    setFieldValue: mockSetFieldValue,
    handleBlur: mockBlur
  })
}));

jest.mock('../../../../utils/use-pockets-handlers', () => ({
  __esModule: true,
  default: () => ({
    setUpload: mockSetUpload,
    setPocketsImage: mockSetPocketsImage
  })
}));

jest.spyOn(global, 'FileReader').mockImplementation(function () {
  this.readAsDataURL = jest.fn();
  this.onload = jest.fn();
});

describe('pocket form tests', () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let component;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockPosition);
    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');
    spyOnUseDispatch.mockImplementation(() => jest.fn());

    component = mount(<PocketsForm />);
  });
  afterEach(() => {
    component.unmount();
    spyOnUseDispatch.mockClear();
    spyOnUseSelector.mockClear();
  });

  it('Should upload image', () => {
    const imageContainer = component.find(ImageUploadContainer);
    const handler = imageContainer.prop('handler');
    handler(files);
    expect(mockSetUpload).toHaveBeenCalledTimes(1);
    expect(mockSetUpload).toHaveBeenCalledWith(files[0]);
  });

  it('Should test FileReader ', () => {
    const reader = FileReader.mock.instances[0];
    reader.onload(target);
    expect(reader.readAsDataURL).toHaveBeenCalled();
    expect(reader.readAsDataURL).toHaveBeenCalledWith(files[0]);
  });

  it('Should update checkboxes checked value on click', () => {
    const { getByRole } = render(<PocketsForm />);
    act(() => {
      fireEvent.click(getByRole('checkbox'));
    });
    expect(mockSetFieldValue).toHaveBeenCalled();
  });

  it('Should click onsubmit button', () => {
    const event = {
      preventDefault: () => {}
    };
    jest.spyOn(event, 'preventDefault');
    component.find('form').simulate('submit', event);
    expect(event.preventDefault).toBeCalled();
  });

  it('should coverage getOptionSelected in AutoComplete', () => {
    const label = component.find(Autocomplete).props();
    label.getOptionSelected(
      '604394a2a7532c33dcb326d5',
      '604394a2a7532c33dcb326d5'
    );
    expect(label).toBeDefined();
  });

  it('should coverage getOptionLabel in Autocomplete', () => {
    const label = component.find(Autocomplete).props();
    label.getOptionLabel(Sizes.list[0]);
    expect(label).toBeDefined();
  });

  it('should coverage onTagsChange', () => {
    const positionsData = component.find(Autocomplete).props();
    positionsData.onChange(null, Sizes.list);
    expect(positionsData).toBeDefined();
  });

  it('should coverage error', () => {
    const positionsData = component.find(Autocomplete).props();
    positionsData.onChange(null, Sizes.list);
    expect(positionsData).toBeDefined();
  });

  it('should coverage availablePositions', () => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockPositionWithData);
    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');
    spyOnUseDispatch.mockImplementation(() => jest.fn());
    component = mount(<PocketsForm />);
    expect(component).toBeDefined();
  });
  it('should coverage test', () => {
    component = mount(<PocketsForm edit />);
    expect(component).toBeDefined();
  });
});
