// import React from 'react';
// import * as reactRedux from 'react-redux';
// import { configure, mount ,shallow} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import PropTypes from 'prop-types';
// import BackForm from '../index';
// import ImageUploadContainer from '../../../../containers/image-upload-container';
// import { config } from '../../../../configs';
// import {
//     mockMaterial,
//     mockBack,
//     mockId,
//     mockEdit,
//     event,
//     target
// } from './back-form.variables';
//
// configure({ adapter: new Adapter() });

// const mockSetFieldValue = jest.fn();
// const mockSubmit = jest.fn();
// const mockChange = jest.fn();
// const mockBlur = jest.fn();

// const { GO_BACK_TITLE, SAVE_TITLE } = config.buttonTitles;

// jest.mock('formik', () => ({
//     ...jest.requireActual('formik'),
//     useFormik: () => ({
//         values: {},
//         handleSubmit: mockSubmit,
//         handleChange: mockChange,
//         touched: {},
//         errors: {},
//         setFieldValue: mockSetFieldValue,
//         handleBlur: mockBlur
//     })
// }));

// describe('Back form tests', () => {
//     let spyOnUseSelector;
//     let spyOnUseDispatch;
//     let mockDispatch;
//     let component;
//     let getState;
//
//     beforeEach(() => {
//         spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
//         spyOnUseSelector.mockImplementation(() => mockMaterial);
//
//         spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');
//
//         mockDispatch = jest.fn();
//         spyOnUseDispatch.mockReturnValue(mockDispatch);
//         component = mount(<BackForm />);
//     });
//     afterEach(() => {
//         jest.restoreAllMocks();
//         spyOnUseSelector.mockClear();
//         component.unmount();
//     });
//
//     it('should render form component', () => {
//         const wrapper = component.find('form');
//         expect(wrapper.length).toBe(1);
//     });
// });
