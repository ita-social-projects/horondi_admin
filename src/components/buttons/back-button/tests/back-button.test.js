import React from 'react';
import Enzyme, { mount } from 'enzyme';
import * as reactRedux from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import BackButton from '../index';
import { config } from '../../../../configs';
import useSuccessSnackbar from '../../../../utils/use-success-snackbar';
import { variables as testProps } from './variables';

Enzyme.configure({ adapter: new Adapter() });

const { GO_BACK_TITLE } = config.buttonTitles;

const { openSuccessSnackbar } = useSuccessSnackbar();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn()
}));

describe('Back button tests', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  let component;

  jest.spyOn(reactRedux, 'useDispatch');
  const mockHolder = jest.fn();

  beforeEach(() => {
    component = mount(<BackButton {...testProps} />);
  });
  afterEach(() => {
    component.unmount();
  });
  it('Should handle click the button', () => {
    useDispatchMock.mockReturnValue(mockHolder);
    const wrapper = mount(<BackButton />);
    wrapper.find('button').simulate('click');
    expect(mockHolder.mock.calls.length).toEqual(0);
  });
  it('Should openSuccessSnackbar exist', () => {
    const testProps = {
      initial: true,
      color: 'primary',
      type: 'button',
      variant: 'outlined'
    };
    const wrapper = mount(<BackButton {...testProps} />);
    wrapper.find('button').simulate('click');
    expect(openSuccessSnackbar).toBeDefined();
  });
  it('Should render BackButton ', () => {
    expect(component).toBeDefined();
  });
  it('Should have type', () => {
    expect(component.find('button').type()).toEqual('button');
  });
  it('Should render the  button with BACK label', () => {
    const btn = component.find('button');
    expect(btn.text()).toBe(GO_BACK_TITLE);
  });
  it('Should have valid props', () => {
    expect(component.props().initial).toBeDefined();
    expect(component.props().initial).toEqual(testProps.initial);
    expect(component.props().initial).toBeFalsy();

    expect(component.props().color).toBeDefined();
    expect(component.props().color).toEqual(testProps.color);
    expect(component.props().color).toBeTruthy();

    expect(component.props().type).toBeDefined();
    expect(component.props().type).toEqual(testProps.type);
    expect(component.props().type).toBeTruthy();

    expect(component.props().variant).toBeDefined();
    expect(component.props().variant).toEqual(testProps.variant);
    expect(component.props().variant).toBeTruthy();
  });
  it('Should have default props', () => {
    expect(BackButton.propTypes.initial).toBeDefined();
    expect(BackButton.propTypes.color).toBeDefined();
    expect(BackButton.propTypes.type).toBeDefined();
    expect(BackButton.propTypes.variant).toBeDefined();
  });
});
