import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import Button from '@material-ui/core/Button';

import { useDispatch as useDispatchMock } from 'react-redux';
import * as reactRedux from 'react-redux';
import ColorsBar from '../colors-bar';
import ColorsAutocomplete from '../../colors-autocomplete';
import DialogWindowWrapper from '../../dialog-window-wrapper';
import store from './store';
import Categories from '../../../pages/categories';
import LoadingBar from '../../loading-bar';
import DialogTitle from '../../../containers/form-dialog/components/dialog-title';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = store;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector) => selector(mockStore),
  useDispatch: () => jest.fn()
}));

describe('Colors-Bar test', () => {
  jest.spyOn(reactRedux, 'useDispatch');
  const mockHolder = jest.fn();
  let component;
  let store;
  const mockOnColorChange = jest.fn();

  beforeEach(() => {
    component = mount(
      <ColorsBar
        onColorChange={mockOnColorChange}
        colors={mockStore.Color.list}
        store={store}
      />
    );
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
    expect(component.find(DialogWindowWrapper)).toHaveLength(2);
  });

  it('should have props', () => {
    expect(component.props().onColorChange).toBeDefined();
    expect(component.props().colors).toBeDefined();
  });

  it('Button is working', () => {
    useDispatchMock.mockReturnValue(mockHolder);
    const wrapper = mount(
      <ColorsBar
        onColorChange={mockOnColorChange}
        store={store}
        colors={mockStore.Color.list}
      />
    );
    wrapper.find(Button).simulate('click');
    expect(mockHolder.mock.calls.length).toEqual(2);
  });

  it('Button is working2', () => {
    useDispatchMock.mockReturnValue(mockHolder);

    const wrapper = component.find({ title: 'Створити колір' });
    // console.log(wrapper.debug());
    // console.log(instance);
    wrapper.handleClose();
    expect(mockHolder.mock.calls.length).toEqual(2);
  });

  it('Should render DialogWindow', () => {
    mockStore.Color.showColorDialogWindow = true;
    const component2 = mount(
      <ColorsBar
        onColorChange={mockOnColorChange}
        store={store}
        colors={mockStore.Color.list}
      />
    );
    expect(component2.exists(DialogTitle)).toBe(true);
    mockStore.Color.showColorDialogWindow = false;
  });
});
