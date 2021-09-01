import {
  GET_BASIC,
  GET_BASICS,
  ADD_BASIC,
  SET_BASIC_ERROR,
  SET_BASIC,
  SET_BASICS,
  SET_BASICS_LOADING,
  SET_BASICS_FILTER,
  CLEAR_FILTER,
  REMOVE_BASIC,
  DELETE_BASIC,
  UPDATE_BASIC
} from '../basics.types';

import {
  getAllBasics,
  getBasic,
  addBasic,
  setBasics,
  setBasicError,
  setBasic,
  setBasicsLoading,
  removeBasicFromState,
  deleteBasic,
  updateBasic,
  clearFilters,
  setFilter
} from '../basics.actions';

import { mockBasics, mockId, filter } from './basics.variables';

describe('Basic action tests', () => {
  it('should get Basic', () => {
    expect(getBasic(mockId)).toEqual({
      type: GET_BASIC,
      payload: mockId
    });
  });

  it('should get basics', () => {
    expect(getAllBasics()).toEqual({
      type: GET_BASICS
    });
  });

  it('should add basic', () => {
    expect(addBasic(mockBasics.list.items[0])).toEqual({
      type: ADD_BASIC,
      payload: mockBasics.list.items[0]
    });
  });

  it('should set basic ', () => {
    expect(setBasic(mockBasics.list.items[0])).toEqual({
      type: SET_BASIC,
      payload: mockBasics.list.items[0]
    });
  });

  it('should set basics', () => {
    expect(setBasics(mockBasics.list)).toEqual({
      type: SET_BASICS,
      payload: mockBasics.list
    });
  });

  it('should set basic loading to true', () => {
    expect(setBasicsLoading(true)).toEqual({
      type: SET_BASICS_LOADING,
      payload: true
    });
  });

  it('should set basic error', () => {
    expect(setBasicError(true)).toEqual({
      type: SET_BASIC_ERROR,
      payload: true
    });
  });

  it('should update basic', () => {
    expect(updateBasic(mockBasics.list.items[0])).toEqual({
      type: UPDATE_BASIC,
      payload: mockBasics.list.items[0]
    });
  });

  it('should delete basic ', () => {
    expect(deleteBasic(mockId)).toEqual({
      type: DELETE_BASIC,
      payload: mockId
    });
  });

  it('should remove basic by id from store', () => {
    expect(removeBasicFromState(mockId)).toEqual({
      type: REMOVE_BASIC,
      payload: mockId
    });
  });

  it('should set a filter to be applied to the given list of basics', () => {
    expect(setFilter(filter)).toEqual({
      type: SET_BASICS_FILTER,
      payload: filter
    });
  });

  it('should clear all basics filters', () => {
    expect(clearFilters()).toEqual({
      type: CLEAR_FILTER
    });
  });
});
