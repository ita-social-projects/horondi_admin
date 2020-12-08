import {
  setHeaders,
  setHeaderLoading,
  setHeader,
  setHeaderError,
  removeHeaderFromStore
} from '../header.actions';

import headerReducer, { initialState } from '../header.reducer';

import { mockHeader, headers, filteredHeaders } from './header.variables';

describe('header reducer tests', () => {
  it('should return default state', () => {
    expect(headerReducer()).toEqual(initialState);
  });

  it('should set header to the store', () => {
    expect(headerReducer(initialState, setHeader(mockHeader))).toEqual({
      ...initialState,
      header: mockHeader
    });
  });

  it('should set headers to the store', () => {
    expect(headerReducer(initialState, setHeaders(headers))).toEqual({
      ...initialState,
      list: headers
    });
  });

  it('should set header error', () => {
    expect(headerReducer(initialState, setHeaderError(true))).toEqual({
      ...initialState,
      headerError: true
    });
  });

  it('should handle header loading', () => {
    expect(headerReducer(initialState, setHeaderLoading(true))).toEqual({
      ...initialState,
      headerLoading: true
    });
  });

  it('should remove header from the store', () => {
    expect(
      headerReducer(initialState, removeHeaderFromStore(mockHeader))
    ).toEqual({
      ...initialState,
      list: filteredHeaders
    });
  });
});
