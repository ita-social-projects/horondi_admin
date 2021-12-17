import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'lodash';
import SaveButton, { saveButtonHandler } from './save-button';
import { config, inputTypes } from '../../../configs';

const { SAVE_TITLE } = config.buttonTitles;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector) => selector(),
  useDispatch: () => jest.fn()
}));

describe('save button tests', () => {
  const size = 'small';
  const title = SAVE_TITLE;
  const type = inputTypes.button;
  const mockCallBack = jest.fn(noop());
  const mockUnblock = jest.fn();

  let component;

  beforeEach(() => {
    component = mount(
      <SaveButton
        size={size}
        title={title}
        type={type}
        onClickHandler={mockCallBack}
        unblockFunction={mockUnblock}
      />
    );
  });

  afterEach(() => {
    component.unmount();
  });

  it('should click', () => {
    expect(mockCallBack.mock.calls.length).toBe(0);
    component.find('button').simulate('click');
  });
  it('should exist and have value', () => {
    expect(component.prop('onClickHandler')).toEqual(mockCallBack);
  });
  it('should have type', () => {
    expect(component.find('button').type()).toEqual('button');
  });
  it('should have props', () => {
    expect(component.props().type).toBeDefined();
    expect(component.props().type).toEqual(type);
    expect(component.props().onClickHandler).toBeDefined();
    expect(component.props().onClickHandler).toBeTruthy();
  });
  it('should have propTypes', () => {
    expect(SaveButton.propTypes.title).toBeDefined();
    expect(SaveButton.propTypes.type).toBeDefined();
    expect(SaveButton.propTypes.onClickHandler).toBeDefined();
    expect(SaveButton.propTypes.unblockFunction).toBeDefined();
  });
  it('should have default props', () => {
    expect(SaveButton.defaultProps.onClickHandler).toEqual(noop);
  });
  it('should call saveButtonHandler', () => {
    const unblockFunctionMock = jest.fn();

    const result = saveButtonHandler(
      { unblockFunction: unblockFunctionMock },
      () => null,
      () => null,
      () => null,
      '',
      ''
    );
    result();

    expect(unblockFunctionMock).toHaveBeenCalled();
  });
});
