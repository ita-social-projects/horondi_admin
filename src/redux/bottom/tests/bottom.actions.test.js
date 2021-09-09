import {
  GET_BOTTOM,
  GET_BOTTOMS,
  ADD_BOTTOM,
  SET_BOTTOMS,
  SET_BOTTOM_LOADING,
  SET_BOTTOM,
  SET_BOTTOM_ERROR,
  REMOVE_BOTTOM_FROM_STORE,
  DELETE_BOTTOM,
  UPDATE_BOTTOM,
  SET_BOTTOM_FILTER,
  CLEAR_FILTERS,
  CLEAR_BOTTOM
} from '../bottom.types';

import {
  getBottom,
  getBottoms,
  addBottom,
  setBottoms,
  setBottomLoading,
  setBottom,
  setBottomError,
  removeBottomFromStore,
  deleteBottom,
  updateBottom,
  setFilter,
  clearFilters,
  clearBottom
} from '../bottom.actions';

import { mockBottoms, mockId, filter } from './bottom.variables';

describe('Bottom actions tests', () => {
  it('Should get bottom', () => {
    expect(getBottom(mockId)).toEqual({
      type: GET_BOTTOM,
      payload: mockId
    });
  });
  it('Should add bottom', () => {
    expect(addBottom(mockBottoms.items[0])).toEqual({
      type: ADD_BOTTOM,
      payload: mockBottoms.items[0]
    });
  });
  it('should set bottom', () => {
    expect(setBottom(mockBottoms.items[0])).toEqual({
      type: SET_BOTTOM,
      payload: mockBottoms.items[0]
    });
  });
  it('should get bottoms', () => {
    expect(getBottoms()).toEqual({ type: GET_BOTTOMS });
  });
  it('should set bottoms', () => {
    expect(setBottoms(mockBottoms.list)).toEqual({
      type: SET_BOTTOMS,
      payload: mockBottoms.list
    });
  });
  it('Should set bottomLoading to true', () => {
    expect(setBottomLoading(true)).toEqual({
      type: SET_BOTTOM_LOADING,
      payload: true
    });
  });
  it('Should set bottomError to true', () => {
    expect(setBottomError(true)).toEqual({
      type: SET_BOTTOM_ERROR,
      payload: true
    });
  });
  it('Should update bottom', () => {
    expect(updateBottom(mockBottoms.items[0])).toEqual({
      type: UPDATE_BOTTOM,
      payload: mockBottoms.items[0]
    });
  });
  it('Should delete bottom', () => {
    expect(deleteBottom(mockId)).toEqual({
      type: DELETE_BOTTOM,
      payload: mockId
    });
  });
  it('Should delete bottom from store', () => {
    expect(removeBottomFromStore(mockId)).toEqual({
      type: REMOVE_BOTTOM_FROM_STORE,
      payload: mockId
    });
  });
  it('Should set a filter to be applied to the given list of bottoms', () => {
    expect(setFilter(filter)).toEqual({
      type: SET_BOTTOM_FILTER,
      payload: filter
    });
  });
  it('Should clear bottom filters', () => {
    expect(clearFilters()).toEqual({
      type: CLEAR_FILTERS
    });
  });
  it('Should clear bottom', () => {
    expect(clearBottom()).toEqual({
      type: CLEAR_BOTTOM
    });
  });
});
