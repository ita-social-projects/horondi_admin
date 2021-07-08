import React from 'react';
import PropTypes from 'prop-types';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as redux from 'react-redux';
import { render, fireEvent, act } from '@testing-library/react';

import CommentForm from '../index';
import { config } from '../../../../configs';
import {
  mockComment,
  mockId,
  mockIsEdit,
  mockCommentWithoutProduct
} from './comment-form.variables';

configure({ adapter: new Adapter() });
const { GO_BACK_TITLE, SAVE_TITLE } = config.buttonTitles;
const { productInfo } = config.labels.comment;

const mockHistoryPush = jest.fn();
const mockUseDispatchFn = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

const mockSetFieldValue = jest.fn();
jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: {},
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    touched: {},
    errors: {},
    setFieldValue: mockSetFieldValue
  })
}));

describe('Comment form tests', () => {
  const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
  let wrapper;

  beforeEach(() => {
    mockUseDispatch.mockImplementation(() => mockUseDispatchFn);
    wrapper = mount(
      <CommentForm comment={mockComment} id={mockId} isEdit={mockIsEdit} />
    );
  });

  afterEach(() => {
    wrapper.unmount();
    mockUseDispatch.mockClear();
  });

  it('Should render component form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('Should update checkboxes checked value on click', () => {
    const { getByRole } = render(
      <CommentForm comment={mockComment} id={mockId} isEdit={mockIsEdit} />
    );
    act(() => {
      fireEvent.click(getByRole('checkbox'));
    });
    expect(mockSetFieldValue).toHaveBeenCalled();
  });

  it('Should render three buttons and one input', () => {
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(3);
  });

  it(`Should render Product Info button with '${productInfo}' label`, () => {
    expect(wrapper.find('button').at(2).text()).toBe(productInfo);
  });

  it(`Should call handleClick Product Info button click`, () => {
    const { getAllByRole } = render(
      <CommentForm comment={mockComment} id={mockId} isEdit={mockIsEdit} />
    );
    fireEvent.click(getAllByRole('button')[2]);
    expect(mockHistoryPush).toHaveBeenCalled();
    expect(mockHistoryPush).toHaveBeenCalledWith(
      `/products/${mockComment.product._id}`
    );
  });

  it(`Should render Go back button with '${GO_BACK_TITLE}' label`, () => {
    expect(wrapper.find('button').at(0).text()).toBe(GO_BACK_TITLE);
  });

  it(`Should render Save button with '${SAVE_TITLE}' label`, () => {
    expect(wrapper.find('button').at(1).text()).toBe(SAVE_TITLE);
  });

  it('Should have appropriate prop types', () => {
    expect(CommentForm.propTypes.id).toBe(PropTypes.string);
    expect(CommentForm.propTypes.isEdit).toBe(PropTypes.bool);
  });
  it(`Should call handleClick Product Info button click`, () => {
    const { getAllByRole } = render(
      <CommentForm
        comment={mockCommentWithoutProduct}
        id={mockId}
        isEdit={mockIsEdit}
      />
    );
    fireEvent.click(getAllByRole('button')[0]);
    expect(mockUseDispatchFn).toHaveBeenCalled();
  });
  it('Should have default props', () => {
    expect(CommentForm.defaultProps).toBeDefined();
    expect(CommentForm.defaultProps.id).toBe('');
    expect(CommentForm.defaultProps.values).toEqual({});
    expect(CommentForm.defaultProps.errors).toEqual({});
    expect(CommentForm.defaultProps.touched).toEqual({});
    expect(CommentForm.defaultProps.comment._id).toBe('');
    expect(CommentForm.defaultProps.comment.text).toBe('');
    expect(CommentForm.defaultProps.comment.show).toBeFalsy();
    expect(CommentForm.defaultProps.isEdit).toBeFalsy();
  });
});
