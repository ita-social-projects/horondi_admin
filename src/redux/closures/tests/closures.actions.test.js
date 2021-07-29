import {
  ADD_CLOSURE,
  GET_CLOSURES,
  SET_CLOSURES,
  SET_CLOSURES_LOADING,
  DELETE_CLOSURE,
  REMOVE_CLOSURE_FROM_STATE,
  GET_CLOSURE,
  SET_CLOSURE,
  UPDATE_CLOSURE,
  SET_CLOSURE_FILTER,
  CLEAR_FILTER
} from '../closures.types';

import {
  getClosure,
  getAllClosures,
  addClosures,
  setClosures,
  setClosuresLoading,
  setClosure,
  removeClosureFromState,
  deleteClosure,
  updateClosure,
  setFilter,
  clearFilters
} from '../closures.actions';

import { mockClosures, mockId, filter } from './mockClosures';

describe('closure actions tests', () => {
  it('should get closure ', () => {
    expect(getClosure(mockId)).toEqual({
      type: GET_CLOSURE,
      payload: mockId
    });
  });
  it('should add closure ', () => {
    expect(addClosures(mockClosures.items[0])).toEqual({
      type: ADD_CLOSURE,
      payload: mockClosures.items[0]
    });
  });
  it('should set closure ', () => {
    expect(setClosure(mockClosures.items[0])).toEqual({
      type: SET_CLOSURE,
      payload: mockClosures.items[0]
    });
  });
  it('should get closures', () => {
    expect(getAllClosures()).toEqual({ type: GET_CLOSURES });
  });
  it('should set closures', () => {
    expect(setClosures(mockClosures.list)).toEqual({
      type: SET_CLOSURES,
      payload: mockClosures.list
    });
  });
  it('should set closure  loading to true', () => {
    expect(setClosuresLoading(true)).toEqual({
      type: SET_CLOSURES_LOADING,
      payload: true
    });
  });

  it('should update closure ', () => {
    expect(updateClosure(mockClosures.items[0])).toEqual({
      type: UPDATE_CLOSURE,
      payload: mockClosures.items[0]
    });
  });
  it('should delete closure ', () => {
    const closureToDelete = mockId;
    expect(deleteClosure(closureToDelete)).toEqual({
      type: DELETE_CLOSURE,
      payload: closureToDelete
    });
  });
  it('should remove closure  by id from store', () => {
    expect(removeClosureFromState(mockId)).toEqual({
      type: REMOVE_CLOSURE_FROM_STATE,
      payload: mockId
    });
  });
  it('should set a filter to be applied to the given list of closures', () => {
    expect(setFilter(filter)).toEqual({
      type: SET_CLOSURE_FILTER,
      payload: filter
    });
  });
  it('should clear all closures filters', () => {
    expect(clearFilters()).toEqual({
      type: CLEAR_FILTER
    });
  });
});
