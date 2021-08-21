import { setError } from '../../error/error.actions';

import Error, { initialState } from '../../error/error.reducer';
import { mockError } from './error.variables';

describe('Test error reducer', () => {
  it('should return defaul state', () => {
    expect(Error()).toEqual(initialState);
  });

  it('should set error to state', () => {
    expect(Error(initialState, setError(mockError))).toEqual({
      error: mockError
    });
  });
});
