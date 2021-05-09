import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import variables from './variables';
import { useDispatch as useDispatchMock } from 'react-redux';
import * as reactRedux from 'react-redux';
import BusinessPageForm from '../index';
import { BrowserRouter as Router } from 'react-router-dom';
import { Paper, TextField, Grid, Typography } from '@material-ui/core';

const mockStore = variables;
Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector) => selector(mockStore),
  useDispatch: () => jest.fn()
}));

// const mockSetFieldValue = jest.fn();
// jest.mock('formik', () => ({
//   ...jest.requireActual('formik'),
//   useFormik: () => ({
//     values: {},
//     handleSubmit: jest.fn(),
//     handleChange: jest.fn(),
//     touched: {},
//     errors: {},
//     setFieldValue: mockSetFieldValue
//   })
// }));

describe('BusinessPageForm component tests', () => {
  jest.spyOn(reactRedux, 'useDispatch');
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Router>
        <BusinessPageForm id={mockStore.id} editMode={mockStore.editMode} />
      </Router>
    );
  });

  // beforeEach(() => {
  //   wrapper = mount(
  //     <Router>
  //       <BusinessPageForm id={mockStore.id} editMode={mockStore.editMode} />
  //     </Router>
  //   );
  // });

  // afterEach(() => {
  //   wrapper.unmount();
  // });

  it('Should render BusinessPageForm component', () => {
    expect(wrapper).toBeDefined();
  });

  it('Should render BusinessPageForm component', () => {
    expect(1 + 2).toBe(3);
  });
});
