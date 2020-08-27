import { pattern, patterns, patternToRemoveId } from './pattern.variables';
import {
  setPatternError,
  setPatternLoading,
  setPatterns,
  setPattern,
  removePatternFromStore
} from '../pattern.actions';

import patternReducer, { initialState } from '../pattern.reducer';

describe('reducer tests', () => {
  it('should return default state', () => {
    expect(patternReducer()).toEqual(initialState);
  });

  it('should set pattern to store', () => {
    expect(patternReducer(initialState, setPattern(pattern))).toEqual({
      ...initialState,
      pattern
    });
  });
  it('should set pattern loading to true', () => {
    expect(patternReducer(initialState, setPatternLoading(true))).toEqual({
      ...initialState,
      patternLoading: true
    });
  });
  it('should set pattern error to true', () => {
    expect(patternReducer(initialState, setPatternError(true))).toEqual({
      ...initialState,
      patternError: true
    });
  });
  it('should set patterns to store', () => {
    expect(patternReducer(initialState, setPatterns(patterns))).toEqual({
      ...initialState,
      patterns
    });
  });
  it('should remove pattern from store', () => {
    const state = { ...initialState, patterns };
    expect(
      patternReducer(state, removePatternFromStore(patternToRemoveId))
    ).toEqual({
      ...state,
      patterns: [
        {
          _id: 'fdc7529135f2c050c877a67a',
          description: [
            {
              value: 'Фабричний гобелен із зображенням синьої хвильки'
            },
            {
              value: 'Manufactured tapestry with blue wave pattern'
            }
          ],
          name: [
            {
              value: 'Синя хвилька'
            },
            {
              value: 'Blue wave'
            }
          ],
          handmade: false,
          available: true,
          material: 'Cotton',
          images: {
            thumbnail: 'thumbnail_335nr4j5dkebkvle7_blue-wave.jpg'
          }
        },
        {
          _id: '51af3801f347948f14f6933c',
          description: [
            {
              value: 'Фабричний гобелен із зображенням синьо-рожевої хвильки'
            },
            {
              value: 'Manufactured tapestry with blue-pink wave pattern'
            }
          ],
          name: [
            {
              value: 'Синьо-рожева хвилька'
            },
            {
              value: 'Blue-pink wave'
            }
          ],
          handmade: false,
          available: true,
          material: 'Cotton',
          images: {
            thumbnail: 'thumbnail_335nr431gkebp19ht_blue-pink.jpg'
          }
        }
      ]
    });
  });
});
