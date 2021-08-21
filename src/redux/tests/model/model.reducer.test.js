import {
  setModels,
  setModelLoading,
  setModel,
  setModelError,
  removeModelFromStore
} from '../../model/model.actions';

import { mockError, mockId, mockModel, mockModels } from './model.variables';

import modelReducer, { initialState } from '../../model/model.reducer';

describe('Test model reducer', () => {
  it('should return default state', () => {
    expect(modelReducer()).toEqual(initialState);
  });

  it('should set models into state', () => {
    expect(modelReducer(initialState, setModels(mockModels.items))).toEqual({
      ...initialState,
      list: mockModels.items
    });
  });

  it('should set model into state', () => {
    expect(modelReducer(initialState, setModel(mockModel))).toEqual({
      ...initialState,
      model: mockModel
    });
  });

  it('should set model loading into state', () => {
    expect(modelReducer(initialState, setModelLoading(true))).toEqual({
      ...initialState,
      modelLoading: true
    });
  });

  it('should set model error into state', () => {
    expect(modelReducer(initialState, setModelError(mockError))).toEqual({
      ...initialState,
      modelError: mockError
    });
  });

  it('should remove model from state', () => {
    expect(
      modelReducer(
        {
          ...initialState,
          list: mockModels.items
        },
        removeModelFromStore(mockId)
      )
    ).toEqual({
      ...initialState,
      list: []
    });
  });
});
