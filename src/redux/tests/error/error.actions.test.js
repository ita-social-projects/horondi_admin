import { setError } from '../../error/error.actions';

import { SET_ERROR } from '../../error/error.types';

import { mockError } from './error.variables';

describe('Test error action', () => {
  it('should set error', () => {
    expect(setError(mockError)).toEqual({
      type: SET_ERROR,
      payload: mockError
    });
  });
});
