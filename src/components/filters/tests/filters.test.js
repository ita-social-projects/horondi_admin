import React, { useEffect } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as reactRedux from 'react-redux';
import { act } from 'react-dom/test-utils';
import IconButton from '@material-ui/core/IconButton';

import Clear from '../clear/clear';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let spyOnUseDispatch;
let mockDispatch;
let spyOnUseSelector;

describe('Testing filters', () => {
  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();

    spyOnUseDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    wrapper = null;
  });

  it('Should render "Clear"', () => {
    wrapper = mount(<Clear />);

    expect(wrapper).toBeDefined();
  });
});
