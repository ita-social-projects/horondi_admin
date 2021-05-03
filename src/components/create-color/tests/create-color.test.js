import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import * as reactRedux from 'react-redux';
import CreateColor from '../create-color';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = {
  loading: true
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector) => selector(mockStore),
  useDispatch: () => jest.fn()
}));

describe('Categories test', () => {
  jest.spyOn(reactRedux, 'useDispatch');

  // const mockHolder = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<CreateColor />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should render CreateColor page', () => {
    console.log(wrapper);
    expect(wrapper).toBeDefined();
  });
});
