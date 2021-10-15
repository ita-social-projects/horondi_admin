import React from 'react';

import Button from '@material-ui/core/Button';

import ColorsBar from '../colors-bar';
import ColorsAutocomplete from '../../colors-autocomplete';
import DialogWindowWrapper from '../../dialog-window-wrapper';
import mockStore from './mockStore';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector) => selector(mockStore),
  useDispatch: () => mockDispatch
}));

describe('Colors-Bar test', () => {
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

    it('Should render MaterialItems if store->boundMaterials exists', () => {
      expect(component.exists({ className: 'makeStyles-materialItem-4' })).toBe(
        true
      );
    });

    it('Should not render MaterialItems if store->boundMaterials is null', () => {
      expect(component.exists({ className: 'makeStyles-materialItem-4' })).toBe(
        true
      );
      const temp = mockStore.Color.boundMaterials;
      mockStore.Color.boundMaterials = null;
      const component2 = shallow(
        <ColorsBar
          onColorChange={mockOnColorChange}
          colors={mockStore.Color.list}
          store={store}
        />
      );
      expect(
        component2.exists({ className: 'makeStyles-materialItem-4' })
      ).toBe(false);
      mockStore.Color.boundMaterials = temp;
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
    it('Button "Створити колір" operates onClick', () => {
      const wrapper = mount(
        <ColorsBar
          onColorChange={mockOnColorChange}
          store={store}
          colors={mockStore.Color.list}
        />
      );

      wrapper.find(Button).simulate('click');
      expect(mockDispatch.mock.calls.length).toEqual(2);
    });

    it('MaterialItem operates onClick', () => {
      const wrapper = shallow(
        <ColorsBar
          onColorChange={mockOnColorChange}
          store={store}
          colors={mockStore.Color.list}
        />
      );

      wrapper
        .find({ className: 'makeStyles-materialItem-4' })
        .props()
        .onClick();
      expect(mockDispatch.mock.calls.length).toEqual(2);
    });

    it('DialogWindow with title "Створити колір" operates handlesClose function', () => {
      const wrapper = component.find({ title: 'Створити колір' });

      wrapper.props().handleClose();
      expect(mockDispatch.mock.calls.length).toEqual(1);
    });

    it('DialogWindow with title "Колір вже використовується!" operates handlesClose function', () => {
      const wrapper = component.find({ title: 'Колір вже використовується!' });

      wrapper.props().handleClose();
      expect(mockDispatch.mock.calls.length).toEqual(1);
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

    it('Should update colorsSet for ColorsAutocomplete component, if handleChange function is called', () => {
      const selectedColorsBefore = component
        .find(ColorsAutocomplete)
        .props().selectedColors;
      component
        .find(ColorsAutocomplete)
        .props()
        .handleChange({ ...mockStore.Color.list[0], ...{ _id: 'fs2' } });
      const selectedColorsAfter = component
        .find(ColorsAutocomplete)
        .props().selectedColors;

      expect(selectedColorsBefore === selectedColorsAfter).toBe(false);
    });
  });

  it('test', () => {
    const wrapper = component.find(ColorsAutocomplete);

    wrapper.prop('deleteHandler')('fs');
    expect(mockDispatch.mock.calls.length).toBe(1);
  });
});
