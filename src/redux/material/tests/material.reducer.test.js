import materialReducer, { initialState } from '../material.reducer';
import {
  setMaterials,
  setMaterialsPerPage,
  setMaterialsPagesCount,
  setMaterialsCurrentPage,
  setMaterialError,
  setMaterialLoading
} from '../material.actions';
import { materials } from './material.variables';

describe('material reducer tests', () => {
  it('should return default value', () => {
    expect(materialReducer(initialState)).toEqual(initialState);
  });
  it('should set materials', () => {
    expect(materialReducer(initialState, setMaterials(materials))).toEqual({
      ...initialState,
      list: materials
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
});
