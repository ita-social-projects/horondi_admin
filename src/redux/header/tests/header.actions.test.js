import {
  GET_HEADERS,
  SET_HEADERS,
  SET_HEADER_LOADING,
  DELETE_HEADER,
  ADD_HEADER,
  GET_HEADER,
  SET_HEADER,
  UPDATE_HEADER,
  SET_HEADER_ERROR,
  REMOVE_HEADER_FROM_STORE
} from '../header.types';

import {
  setHeaders,
  setHeaderLoading,
  setHeader,
  setHeaderError,
  removeHeaderFromStore,
  getHeaders,
  deleteHeader,
  addHeader,
  updateHeader,
  getHeader
} from '../header.actions';

import { headers, id, mockHeader } from './header.variables';

describe('headers tests', () => {
  it('should get all headers', () => {
    expect(getHeaders()).toEqual({
      type: GET_HEADERS
    });
  });

  it('should get one header', () => {
    expect(getHeader(id)).toEqual({
      type: GET_HEADER,
      payload: id
    });
  });

  it('should get all headers', () => {
    expect(setHeaders(headers)).toEqual({
      type: SET_HEADERS,
      payload: headers
    });
  });

  it('should set one header', () => {
    expect(setHeader(mockHeader)).toEqual({
      type: SET_HEADER,
      payload: mockHeader
    });
  });

  it('should set header loading true', () => {
    expect(setHeaderLoading(true)).toEqual({
      type: SET_HEADER_LOADING,
      payload: true
    });
  });

  it('should set header loading false', () => {
    expect(setHeaderLoading(false)).toEqual({
      type: SET_HEADER_LOADING,
      payload: false
    });
  });

  it('should set header error', () => {
    expect(setHeaderError(true)).toEqual({
      type: SET_HEADER_ERROR,
      payload: true
    });
  });

  it('should delete header', () => {
    expect(deleteHeader(id)).toEqual({
      type: DELETE_HEADER,
      payload: id
    });
  });

  it('should add new header', () => {
    expect(addHeader(mockHeader)).toEqual({
      type: ADD_HEADER,
      payload: mockHeader
    });
  });

  it('should update header', () => {
    expect(updateHeader(mockHeader)).toEqual({
      type: UPDATE_HEADER,
      payload: mockHeader
    });
  });

  it('remove header form store', () => {
    expect(removeHeaderFromStore(id)).toEqual({
      type: REMOVE_HEADER_FROM_STORE,
      payload: id
    });
  });
});
