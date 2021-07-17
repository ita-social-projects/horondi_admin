import {
  GET_BACK,
  GET_BACKS,
  ADD_BACK,
  SET_BACKS,
  SET_BACK_LOADING,
  SET_BACK,
  SET_BACK_ERROR,
  REMOVE_BACK_FROM_STORE,
  DELETE_BACK,
  UPDATE_BACK,
  SET_FILTER,
  SET_SORT,
  CLEAR_FILTERS,
  CLEAR_BACK
} from '../back.types';

import {
  getBack,
  getBacks,
  addBack,
  setBacks,
  setBackLoading,
  setBack,
  setBackError,
  removeBackFromStore,
  deleteBack,
  updateBack,
  setFilter,
  setSort,
  clearFilters,
  clearBack
} from '../back.actions';

import { mockBacks, mockId, filter } from './back.variables';

describe('back actions tests', () => {
  it('should get back ', () => {
    expect(getBack(mockId)).toEqual({
      type: GET_BACK,
      payload: mockId
    });
  });
  it('should add back ', () => {
    expect(addBack(mockBacks.items[0])).toEqual({
      type: ADD_BACK,
      payload: mockBacks.items[0]
    });
  });
  it('should set back ', () => {
    expect(setBack(mockBacks.items[0])).toEqual({
      type: SET_BACK,
      payload: mockBacks.items[0]
    });
  });
  it('should get backs', () => {
    expect(getBacks()).toEqual({ type: GET_BACKS });
  });
  it('should set backs', () => {
    expect(setBacks(mockBacks.list)).toEqual({
      type: SET_BACKS,
      payload: mockBacks.list
    });
  });
  it('should set back  loading to true', () => {
    expect(setBackLoading(true)).toEqual({
      type: SET_BACK_LOADING,
      payload: true
    });
  });
  it('should set back  error to true', () => {
    expect(setBackError(true)).toEqual({
      type: SET_BACK_ERROR,
      payload: true
    });
  });
  it('should update back ', () => {
    expect(updateBack(mockBacks.items[0])).toEqual({
      type: UPDATE_BACK,
      payload: mockBacks.items[0]
    });
  });
  it('should delete back ', () => {
    const backToDelete = mockId;
    expect(deleteBack(backToDelete)).toEqual({
      type: DELETE_BACK,
      payload: backToDelete
    });
  });
  it('should remove back  by id from store', () => {
    expect(removeBackFromStore(mockId)).toEqual({
      type: REMOVE_BACK_FROM_STORE,
      payload: mockId
    });
  });
  it('should set a filter to be applied to the given list of backs', () => {
    expect(setFilter(filter)).toEqual({
      type: SET_FILTER,
      payload: filter
    });
  });
  it('should clear all backs filters', () => {
    expect(clearFilters()).toEqual({
      type: CLEAR_FILTERS
    });
  });
});
