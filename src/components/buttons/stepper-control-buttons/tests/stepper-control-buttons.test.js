import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as reactRedux from 'react-redux';
import { noop } from 'lodash';

import StepperControlButtons from '../index';
import { inputTypes, config } from '../../../../configs';
import { productsTranslations } from '../../../../translations/product.translations';

Enzyme.configure({ adapter: new Adapter() });

const { stepsLabels } = config.labels.product;
const { NEXT, CREATE_PRODUCT, BACK } = productsTranslations;
const mockStore = {
  Products: {
    loading: true
  }
};

describe('Stepper control buttons tests', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const mockHandleNext = jest.fn(noop);
  const mockHandleBack = jest.fn(noop);
  const activeStep = stepsLabels.length - 1;
  let component;

  beforeEach(() => {
    useSelectorMock.mockImplementation((callback) => callback(mockStore));
    component = mount(
      <StepperControlButtons
        handleNext={mockHandleNext}
        handleBack={mockHandleBack}
        activeStep={activeStep}
        type={inputTypes.button}
      />
    );
  });

  afterEach(() => {
    component.unmount();
    mockHandleBack.mockClear();
    mockHandleNext.mockClear();
    useSelectorMock.mockClear();
  });

  it('Should render two buttons', () => {
    expect(component.find('button')).toHaveLength(2);
  });
  it('Should render the first button with BACK label', () => {
    const backBtn = component.find('button').first();
    expect(backBtn.text()).toBe(BACK);
  });
  it('Should render the second button with CREATE_PRODUCT label when activeStep equals stepsLabels.length - 1', () => {
    const btn = component.find('button').at(1);
    expect(btn.text()).toBe(CREATE_PRODUCT);
  });
  it('Should render the second button with NEXT label when activeStep does not equal stepsLabels.length - 1', () => {
    component.setProps({ activeStep: activeStep + 1 });
    const btn = component.find('button').at(1);
    expect(btn.text()).toBe(NEXT);
  });
  it('Should run handleBack when click on the first button', () => {
    if (activeStep === 0) {
      component.setProps({ activeStep: 5 });
    }
    component.find('button').first().simulate('click');
    expect(mockHandleBack).toHaveBeenCalledTimes(1);
  });
  it('Should run handleNext when click on the second button', () => {
    component.find('button').at(1).simulate('click');
    expect(mockHandleNext).toHaveBeenCalledTimes(1);
  });
  it('BACK button should be disabled when activeStep equals zero', () => {
    component.setProps({ activeStep: 0 });
    component.find('button').first().simulate('click');
    expect(mockHandleBack).toHaveBeenCalledTimes(0);
  });
  it('Should have default props', () => {
    expect(StepperControlButtons.defaultProps).toBeDefined();
    expect(StepperControlButtons.defaultProps.type).toBe('button');
  });
  it('Should have prop types', () => {
    expect(StepperControlButtons.propTypes.activeStep).toBe(
      PropTypes.number.isRequired
    );
    expect(StepperControlButtons.propTypes.handleNext).toBe(PropTypes.func);
    expect(StepperControlButtons.propTypes.handleBack).toBe(PropTypes.func);
    expect(StepperControlButtons.propTypes.type).toBe(PropTypes.string);
  });
  it('Should render CircularProgress when loading is true', () => {
    const circular = component.find('.MuiCircularProgress-svg');
    expect(circular).toHaveLength(1);
  });
  it('Should not render CircularProgress when loading is false', () => {
    mockStore.Products.loading = false;
    component = mount(
      <StepperControlButtons
        handleNext={mockHandleNext}
        handleBack={mockHandleBack}
        activeStep={activeStep}
        type={inputTypes.button}
      />
    );
    const circular = component.find('.MuiCircularProgress-svg');
    expect(circular).toHaveLength(0);
  });
});
