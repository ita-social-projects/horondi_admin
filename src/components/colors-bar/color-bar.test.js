import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ColorsBar from './colors-bar';

Enzyme.configure({ adapter: new Adapter() });

describe('should render colors-bar component', () => {
  const colors = [
    {
      color: 'red'
    },
    {
      color: 'white'
    }
  ];
  const fu = () => {
    const a = 5;
    return a;
  };

  const store = {
    foo: 'Foo',
    bar: 'Bar'
  };

  let component;

  beforeEach(() => {
    component = mount(<ColorsBar onColorChange={fu} colors={colors} />, store);
  });

  it('should exist', () => {
    // expect(component).toMatchSnapshot();
    expect(component.exists());
  });

  it('should have props', () => {
    expect(component.props().onColorChange).toBeDefined();
    expect(component.props().colors).toBeDefined();
  });
});
