import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as reactRedux from 'react-redux';

import Filters from '../filters/filters';

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
  });

  afterEach(() => {
    wrapper = null;
  });

  describe('Filter in orders tests', () => {
    beforeEach(() => {
      mockDispatch = jest.fn();

      spyOnUseSelector.mockImplementation(() => ({
        filters: {
          search: ''
        }
      }));
      spyOnUseDispatch.mockReturnValue(mockDispatch);
    });

    it('should render', () => {
      wrapper = shallow(<Filters />);

      expect(wrapper).toBeDefined();
    });
  });
});
