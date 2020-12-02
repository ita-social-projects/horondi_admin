import {
  setModel,
  setModels,
  setModelError,
  setModelLoading,
  setModelsCurrentPage,
  setModelsPerPage,
  setPagesCount,
  getModel,
  getModels,
  addModel,
  removeModelFromStore,
  deleteModel,
  updateModel
} from '../model.actions';

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
  SET_MODELS_CURRENT_PAGE,
  SET_MODELS_PER_PAGE,
  SET_MODELS_PAGES_COUNT,
  REMOVE_MODEL_FROM_STORE
} from '../model.types';

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

  it('should set models current page', () => {
    expect(setModelsCurrentPage(mockModel)).toEqual({
      type: SET_MODELS_CURRENT_PAGE,
      payload: mockModel
    });
  });

  it('should set models per page', () => {
    expect(setModelsPerPage(1)).toEqual({
      type: SET_MODELS_PER_PAGE,
      payload: 1
    });
  });

  it('should set pages count', () => {
    expect(setPagesCount(1)).toEqual({
      type: SET_MODELS_PAGES_COUNT,
      payload: 1
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
