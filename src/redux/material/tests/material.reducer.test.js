import materialReducer, { initialState } from '../material.reducer';
import {
  setMaterials,
  setMaterialsPerPage,
  setMaterialsPagesCount,
  setMaterialsCurrentPage,
  setMaterialError,
  setMaterialLoading,
  setNewColorToStore,
  setMaterial,
  removeMaterialFromStore,
  showColorDialogWindow,
  clearColors
} from '../material.actions';
import { mockMaterials } from './material.variables';
import { mockId } from '../../model/tests/model.variables';

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
  it('should set materials per page', () => {
    expect(materialReducer(initialState, setMaterialsPerPage(22))).toEqual({
      ...initialState,
      pagination: {
        currentPage: 0,
        materialsPerPage: 22,
        pagesCount: 1
      }
    });
  });
  it('should set materials pages count', () => {
    expect(materialReducer(initialState, setMaterialsPagesCount(12))).toEqual({
      ...initialState,
      pagination: {
        currentPage: 0,
        materialsPerPage: 6,
        pagesCount: 12
      }
    });
  });
  it('should set materials current page', () => {
    expect(materialReducer(initialState, setMaterialsCurrentPage(5))).toEqual({
      ...initialState,
      pagination: {
        currentPage: 4,
        materialsPerPage: 6,
        pagesCount: 1
      }
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
  it('should add new color to store', () => {
    expect(materialReducer(initialState, setNewColorToStore([]))).toEqual({
      ...initialState,
      colors: [...[], []]
    });
  });
  it('should set showColodialogWindow to true', () => {
    expect(materialReducer(initialState, showColorDialogWindow(true))).toEqual({
      ...initialState,
      showColorDialogWindow: true
    });
  });
  it('remove colors from the store', () => {
    expect(materialReducer(initialState, clearColors())).toEqual({
      ...initialState,
      colors: []
    });
  });
});
