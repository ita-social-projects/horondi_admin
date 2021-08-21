import {
  setModel,
  setModels,
  setModelError,
  setModelLoading,
  getModel,
  getModels,
  addModel,
  removeModelFromStore,
  deleteModel,
  updateModel
} from '../../model/model.actions';

import {
  GET_MODELS,
  SET_MODELS,
  SET_MODEL_LOADING,
  DELETE_MODEL,
  ADD_MODEL,
  GET_MODEL,
  SET_MODEL,
  UPDATE_MODEL,
  SET_MODEL_ERROR,
  REMOVE_MODEL_FROM_STORE
} from '../../model/model.types';

import {
  mockError,
  mockId,
  mockModel,
  mockModels,
  mockModelToUpdate
} from './model.variables';

describe('Test models actions', () => {
  it('should set models', () => {
    expect(setModels(mockModels)).toEqual({
      type: SET_MODELS,
      payload: mockModels
    });
  });

  it('should get all models', () => {
    expect(getModels([])).toEqual({
      type: GET_MODELS,
      payload: []
    });
  });

  it('should delete model', () => {
    expect(deleteModel(mockId)).toEqual({
      type: DELETE_MODEL,
      payload: mockId
    });
  });

  it('should add model', () => {
    expect(addModel(mockModel)).toEqual({
      type: ADD_MODEL,
      payload: mockModel
    });
  });

  it('should set model loading', () => {
    expect(setModelLoading(true)).toEqual({
      type: SET_MODEL_LOADING,
      payload: true
    });
  });

  it('should update model', () => {
    expect(updateModel(mockModelToUpdate)).toEqual({
      type: UPDATE_MODEL,
      payload: mockModelToUpdate
    });
  });

  it('should set model', () => {
    expect(setModel(mockModel)).toEqual({
      type: SET_MODEL,
      payload: mockModel
    });
  });

  it('should get model', () => {
    expect(getModel(mockId)).toEqual({
      type: GET_MODEL,
      payload: mockId
    });
  });

  it('should set model error', () => {
    expect(setModelError(mockError)).toEqual({
      type: SET_MODEL_ERROR,
      payload: mockError
    });
  });

  it('should remove model from state', () => {
    expect(removeModelFromStore(mockId)).toEqual({
      type: REMOVE_MODEL_FROM_STORE,
      payload: mockId
    });
  });
});
