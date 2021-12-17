import React from 'react';
import * as reactRedux from 'react-redux';
import { mount } from 'enzyme';
import { header, id } from './header-form.variables';
import HeaderForm from '../index';
import { SaveButton } from '../../../buttons';

const mockSetFieldValue = jest.fn();
const mockSubmit = jest.fn();
const mockChange = jest.fn();
const mockBlur = jest.fn();
const mockChangeTabs = jest.fn();
const mockCreateHeader = jest.fn();

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: {},
    handleSubmit: mockSubmit,
    handleChange: mockChange,
    touched: {},
    errors: {},
    setFieldValue: mockSetFieldValue,
    handleBlur: mockBlur
  })
}));

jest.mock('../../../../utils/use-header-handlers', () => ({
  __esModule: true,
  default: () => ({
    tabsValue: 0,
    handleTabsChange: mockChangeTabs,
    createHeader: mockCreateHeader
  })
}));

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    block: () => () => null
  })
}));

describe('Straps form tests', () => {
  let spyOnUseDispatch;
  let component;

  beforeEach(() => {
    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');
    spyOnUseDispatch.mockImplementation(() => jest.fn());

    component = mount(<HeaderForm header={header} id={id} />);
  });
  afterEach(() => {
    component.unmount();

    spyOnUseDispatch.mockClear();
  });

  it('Should simulate submit button', () => {
    component.find(SaveButton).prop('onClickHandler')();
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('Should click onsubmit button', () => {
    const event = {
      preventDefault: () => {}
    };

    jest.spyOn(event, 'preventDefault');

    component.find('form').simulate('submit', event);

    expect(event.preventDefault).toBeCalled();
  });
});
