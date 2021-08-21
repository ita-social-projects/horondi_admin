import materialReducer, { initialState } from '../../material/material.reducer';
import {
  setMaterials,
  setMaterialError,
  setMaterialLoading,
  setMaterial,
  removeMaterialFromStore
} from '../../material/material.actions';
import { mockMaterials } from './material.variables';
import { mockId } from '../model/model.variables';

describe('material reducer tests', () => {
  it('should return default value', () => {
    expect(materialReducer()).toEqual(initialState);
  });
  it('should return default value', () => {
    expect(materialReducer(initialState)).toEqual(initialState);
  });
  it('should set materials to store', () => {
    expect(
      materialReducer(initialState, setMaterials(mockMaterials.items))
    ).toEqual({
      ...initialState,
      list: mockMaterials.items
    });
  });
  it('should set material to store', () => {
    expect(
      materialReducer(initialState, setMaterial(mockMaterials.items[0]))
    ).toEqual({
      ...initialState,
      material: mockMaterials.items[0]
    });
  });

  it('should set materials loading to true', () => {
    expect(materialReducer(initialState, setMaterialLoading(true))).toEqual({
      ...initialState,
      materialLoading: true
    });
  });
  it('should set materials error to true', () => {
    expect(materialReducer(initialState, setMaterialError(true))).toEqual({
      ...initialState,
      materialError: true
    });
  });
  it('should remove material from store', () => {
    const filteredMaterials = mockMaterials.items.filter(
      (item) => item._id !== mockId
    );
    const state = { ...initialState, list: mockMaterials.items };
    expect(materialReducer(state, removeMaterialFromStore(mockId))).toEqual({
      ...initialState,
      list: filteredMaterials
    });
  });
});
