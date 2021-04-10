import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import ColorsBar from './colors-bar';
import configureStore from '../../store/store';

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

  const store = configureStore();

  let component;

  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <ColorsBar />
      </Provider>
    );
    console.log('///////////////////////////////////////////////////////////');
    console.log(component.debug());

    console.log('///////////////////////////////////////////////////////////');
    console.log('///////////////////////////////////////////////////////////');
  });

  it('should exist', () => {
    // expect(component).toMatchSnapshot();
    expect(component.exists());
  });

  /* it('should have props', () => {
    expect(component.props().onColorChange).toBeDefined();
    expect(component.props().colors).toBeDefined();
  }); */
});
