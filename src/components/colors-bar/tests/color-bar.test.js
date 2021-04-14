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
    component = shallow(
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

  describe('render tests', () => {
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
  });

  describe('props', () => {
    const component2 = mount(
      <ColorsBar
        onColorChange={mockOnColorChange}
        colors={mockStore.Color.list}
        store={store}
      />
    );

    it('should have props onColorChange and colors with correct types', () => {
      expect(component2.props().onColorChange).toBeDefined();
      expect(typeof component2.props().onColorChange).toBe('function');
      expect(component2.props().colors).toBeDefined();
      expect(typeof component2.props().colors).toBe('object');
    });
  });

  describe('other', () => {
    it('Button "Створити колір" is working', () => {
      useDispatchMock.mockReturnValue(mockHolder);
      const wrapper = mount(
        <ColorsBar
          onColorChange={mockOnColorChange}
          store={store}
          colors={mockStore.Color.list}
        />
      );
      expect(mockHolder.mock.calls.length).toEqual(1);
      wrapper.find(Button).simulate('click');
      expect(mockHolder.mock.calls.length).toEqual(2);
    });

    it('DialogWindow with title "Створити колір" operates handlesClose function', () => {
      useDispatchMock.mockReturnValue(mockHolder);

      const wrapper = component.find({ title: 'Створити колір' });
      // console.log(wrapper.debug());
      // console.log(component.props());

      expect(mockHolder.mock.calls.length).toEqual(2);
      wrapper.props().handleClose();
      expect(mockHolder.mock.calls.length).toEqual(3);
    });

    it('DialogWindow with title "Колір вже використовується!" operates handlesClose function', () => {
      useDispatchMock.mockReturnValue(mockHolder);

      const wrapper = component.find({ title: 'Колір вже використовується!' });
      // console.log(wrapper.debug());
      // console.log(component.props());

      expect(mockHolder.mock.calls.length).toEqual(3);
      wrapper.props().handleClose();
      expect(mockHolder.mock.calls.length).toEqual(4);
    });

    it('Should read showColorDialogWindow attr from store', () => {
      expect(component.find({ title: 'Створити колір' }).props().isOpen).toBe(
        false
      );
      mockStore.Color.showColorDialogWindow = true;
      const component2 = shallow(
        <ColorsBar
          onColorChange={mockOnColorChange}
          store={store}
          colors={mockStore.Color.list}
        />
      );
      expect(component2.find({ title: 'Створити колір' }).props().isOpen).toBe(
        true
      );
      mockStore.Color.showColorDialogWindow = false;
    });

    it('Should read showBoundMaterialsWindow attr from store', () => {
      expect(
        component.find({ title: 'Колір вже використовується!' }).props().isOpen
      ).toBe(false);
      mockStore.Color.showBoundMaterialsWindow = true;
      const component2 = shallow(
        <ColorsBar
          onColorChange={mockOnColorChange}
          store={store}
          colors={mockStore.Color.list}
        />
      );
      expect(
        component2.find({ title: 'Колір вже використовується!' }).props().isOpen
      ).toBe(true);
      mockStore.Color.showBoundMaterialsWindow = false;
    });
  });

  it('test', () => {
    useDispatchMock.mockReturnValue(mockHolder);

    const wrapper = component.find({ title: 'Створити колір' });
    // console.log(wrapper.debug());
    // console.log(component.props());

    expect(mockHolder.mock.calls.length).toEqual(4);
    wrapper.props().handleClose();
    expect(mockHolder.mock.calls.length).toEqual(5);
  });
});
