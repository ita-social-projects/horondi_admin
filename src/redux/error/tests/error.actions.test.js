import { setError } from '../error.actions';

import { SET_ERROR } from '../error.types';

import { mockError } from './error.variables';

describe('Test error action', () => {
  it('should set error', () => {
    expect(setError(mockError)).toEqual({
      type: SET_ERROR,
      payload: mockError
    });
  });
});
