import React from 'react';
import * as reactRedux from 'react-redux';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FormQNA from '../index';
import { SaveButton } from '../../../buttons';
import LoadingBar from '../../../loading-bar';
import {
  mockQuestionsAnswers,
  mockId
} from './questions-answers-form.variables';

configure({ adapter: new Adapter() });

const mockSetFieldValue = jest.fn();
const mockSubmit = jest.fn();
const mockChange = jest.fn();
const mockBlur = jest.fn();

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: {},
    handleSubmit: mockSubmit,
    handleChange: mockChange,
    touched: {},
    errors: {},
    setFieldValue: mockSetFieldValue,
    handleBlur: mockBlur
  })
}));

jest.mock('react-router', () => ({
  withRouter: (component) => component
}));
jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: () => null })
}));
jest.mock('../../../../utils/questions-answers-form', () => ({
  uaSetQuestionsHandler: jest.fn(() => null),
  uaSetAnswersHandler: jest.fn(() => null),
  enSetQuestionsHandler: jest.fn(() => null),
  enSetAnswersHandler: jest.fn(() => null),
  questionsAnswersDispatchHandler: jest.fn(() => null),
  indexFinder: jest.fn(() => null)
}));
jest.mock('../../../../utils/use-questions-answers-handlers', () => ({
  __esModule: true,
  default: () => ({
    uaQuestion: 'texts',
    uaAnswer: 'texts',
    enQuestion: 'texts',
    enAnswer: 'texts',
    uaSetQuestion: jest.fn(() => null),
    uaSetAnswer: jest.fn(() => null),
    enSetQuestion: jest.fn(() => null),
    enSetAnswer: jest.fn(() => null),
    languages: ['ua', 'en'],
    createQuestionsAnswers: jest.fn(() => null)
  })
}));
jest.mock('../../../../hooks/form-dialog/use-unsaved-changes-handler');
jest.mock('../../../../hooks/forms/use-changed-values-checker');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn((f) => f())
}));

describe('Straps form tests', () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let component;

  beforeEach(() => {
    spyOnUseSelector = jest
      .spyOn(reactRedux, 'useSelector')
      .mockImplementation(() => ({
        loading: false,
        questionsAnswersPage: mockQuestionsAnswers
      }));
    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');
    spyOnUseDispatch.mockImplementation(() => jest.fn());

    component = shallow(<FormQNA id={mockId} editMode />);
  });
  afterEach(() => {
    component.unmount();

    spyOnUseDispatch.mockClear();
    spyOnUseSelector.mockClear();
  });

  it('Should simulate submit button', () => {
    component.find(SaveButton).prop('onClickHandler')();
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('Should find loading bar', () => {
    spyOnUseSelector.mockImplementation(() => ({
      loading: true
    }));

    component = shallow(<FormQNA id={mockId} editMode />);

    expect(component.find(LoadingBar)).toHaveLength(1);
  });

  it('Should click onsubmit button', () => {
    const event = {
      preventDefault: () => {}
    };

    jest.spyOn(event, 'preventDefault');

    component.find('form').simulate('submit', event);

    expect(event.preventDefault).toBeCalled();
  });
});
