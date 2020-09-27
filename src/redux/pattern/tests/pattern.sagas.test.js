import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  handlePatternLoad,
  handlePatternsLoad,
  handleAddPattern,
  handlePatternDelete
} from '../pattern.sagas';
import { setPatterns, setPatternLoading, setPattern } from '../pattern.actions';

import { patterns, patternId, pattern } from './pattern.variables';
import {
  getPatternById,
  getAllPatterns,
  createPattern,
  deletePattern,
  updatePattern
} from '../pattern.operations';

describe('pattern sagas test', () => {
  it('should not throw error', () => {
    expect(handleAddPattern).not.toThrow();
    expect(getAllPatterns).not.toThrow();
    expect(getPatternById).not.toThrow();
    expect(createPattern).not.toThrow();
    expect(updatePattern).not.toThrow();
    expect(deletePattern).not.toThrow();
  });
  it('#1 should receive all patterns and set to store', () => {
    const fakePatterns = {
      data: {
        getAllPatterns: {
          ...patterns
        }
      }
    };
    expectSaga(handlePatternsLoad)
      .provide([[matchers.call.fn(getAllPatterns), fakePatterns]])
      .put(setPatternLoading(true))
      .put(setPatterns(fakePatterns))
      .put(setPatternLoading(false))
      .run();
  });
  it('#2 should receive one pattern and set to store', () => {
    const fakePattern = {
      data: {
        getPatternById: {
          ...pattern
        }
      }
    };
    expectSaga(handlePatternLoad, patternId)
      .provide([[matchers.call.fn(getPatternById), fakePattern]])
      .put(setPatternLoading(true))
      .put(setPattern(fakePattern))
      .put(setPatternLoading(false))
      .run();
  });
});
