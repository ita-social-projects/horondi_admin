import React from 'react';
import PropTypes from 'prop-types';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as reactRedux from 'react-redux';
import * as reactRouterDom from 'react-router-dom';
import { render, fireEvent, act } from '@testing-library/react';

import CommentForm from '../index';
import { config } from '../../../../configs';

configure({ adapter: new Adapter() });
const { GO_BACK_TITLE, SAVE_TITLE } = config.buttonTitles;
const { productInfo } = config.labels.comment;

describe('Comment form tests', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const mockHistoryPush = jest.fn();
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
      setFieldValue: mockSetFieldValue
    })
  }));
  const mockComment = {
    text: 'Допоможіть! Дитина помалювала фламастером, нічим не можу вивести.',
    show: true,
    product: {
      _id: 'UID'
    }
  };
  const mockId = '6047321793650236ddbfb841';
  const mockIsEdit = true;
  let wrapper;

  beforeEach(() => {
    useDispatchMock.mockReturnValue(undefined);
    wrapper = mount(
      <CommentForm comment={mockComment} id={mockId} isEdit={mockIsEdit} />
    );
  });

  afterEach(() => {
    wrapper.unmount();
    useDispatchMock.mockClear();
  });

  it('Should render component form', () => {
    expect(wrapper.find('form')).toBeDefined();
  });

  it('Should dispatch update comment if isEdit = true', () => {
    wrapper.find('form').simulate('submit');
    expect(useDispatchMock).toHaveBeenCalledTimes(2);
  });

  it('Should not dispatch update comment if isEdit = false', () => {
    wrapper = mount(
      <CommentForm comment={mockComment} id={mockId} isEdit={!mockIsEdit} />
    );
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(useDispatchMock).toHaveBeenCalledTimes(3);
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

  it('Should render three buttons and two inputs', () => {
    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('button')).toHaveLength(3);
  });

  it(`Should render Product Info button with '${productInfo}' label`, () => {
    expect(wrapper.find('button').at(0).text()).toBe(productInfo);
  });

  it(`Should call handleClick Product Info button click`, () => {
    const { getAllByRole } = render(
      <reactRouterDom.MemoryRouter>
        <CommentForm comment={mockComment} id={mockId} isEdit={mockIsEdit} />
      </reactRouterDom.MemoryRouter>
    );
    fireEvent.click(getAllByRole('button')[0]);
    expect(mockHistoryPush).toHaveBeenCalled();
    expect(mockHistoryPush).toHaveBeenCalledWith(`/${mockComment.product._id}`);
  });

  it(`Should render Go back button with '${GO_BACK_TITLE}' label`, () => {
    expect(wrapper.find('button').at(1).text()).toBe(GO_BACK_TITLE);
  });

  it(`Should render Save button with '${SAVE_TITLE}' label`, () => {
    expect(wrapper.find('button').at(2).text()).toBe(SAVE_TITLE);
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
