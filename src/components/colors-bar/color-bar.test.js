import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ColorsBar from './colors-bar';
import configureStore from '../../store/store';
import ColorsAutocomplete from '../colors-autocomplete';
import DialogWindowWrapper from '../dialog-window-wrapper';
import CreateColor from '../create-color';

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore();

const setUpComponent = (props) =>
  mount(
    <Provider store={store}>
      <ColorsBar {...props} />
    </Provider>
  );

describe('Colors-Bar test', () => {
  let component;

  beforeEach(() => {
    component = setUpComponent();
    // console.log(component.debug());
  });

  afterEach(() => {
    component.unmount();
  });

  it('Should render Colors-Bar', () => {
    expect(component).toBeDefined();
  });

  it('Should render ColorsAutocomplete', () => {
    expect(component.exists(ColorsAutocomplete)).toBe(true);
  });
  it('Should render Button', () => {
    expect(component.exists(Button)).toBe(true);
  });
  it('Should render 2 DialogWindowWrapper', () => {
    expect(component.find(DialogWindowWrapper).length).toBe(2);
  });

  /* it('should have props', () => {
    expect(component.props().onColorChange).toBeDefined();
    expect(component.props().colors).toBeDefined();
  }); */
});
