import {
  setMaterial,
  setMaterials,
  getMaterial,
  getMaterials,
  setMaterialError,
  setMaterialLoading,
  setMaterialsCurrentPage,
  setMaterialsPagesCount,
  setMaterialsPerPage,
  addMaterial,
  updateMaterial,
  deleteMaterial,
  removeMaterialFromStore,
  setNewColorToStore,
  showColorDialogWindow,
  clearColors
} from '../material.actions';
import { mockMaterial, mockMaterials } from './material.variables';
import {
  GET_MATERIALS,
  SET_MATERIALS,
  GET_MATERIAL,
  SET_MATERIAL,
  SET_MATERIAL_LOADING,
  SET_MATERIAL_ERROR,
  SET_MATERIALS_CURRENT_PAGE,
  SET_MATERIALS_PAGES_COUNT,
  SET_MATERIALS_PER_PAGE,
  ADD_MATERIAL,
  UPDATE_MATERIAL,
  DELETE_MATERIAL,
  REMOVE_MATERIAL_FROM_STORE,
  COLOR_DIALOG_DATA_TO_STORE,
  SHOW_COLOR_DIALOG_WINDOW,
  CLEAR_COLORS
} from '../material.types';
import { mockId } from '../../model/tests/model.variables';

describe('material actions tests', () => {
  it('should get materials', () => {
    expect(getMaterials(mockMaterials)).toEqual({
      type: GET_MATERIALS,
      payload: mockMaterials
    });
  });
  it('should set materials', () => {
    expect(setMaterials(mockMaterials)).toEqual({
      type: SET_MATERIALS,
      payload: mockMaterials
    });
  });

  it('should get material', () => {
    expect(getMaterial(mockMaterial)).toEqual({
      type: GET_MATERIAL,
      payload: mockMaterial
    });
  });
  it('should set material', () => {
    expect(setMaterial(mockMaterial)).toEqual({
      type: SET_MATERIAL,
      payload: mockMaterial
    });
  });
  it('should set loading to true', () => {
    expect(setMaterialLoading(true)).toEqual({
      type: SET_MATERIAL_LOADING,
      payload: true
    });
  });
  it('should set error to true', () => {
    expect(setMaterialError(true)).toEqual({
      type: SET_MATERIAL_ERROR,
      payload: true
    });
  });
  it('should set materials current page', () => {
    expect(setMaterialsCurrentPage(11)).toEqual({
      type: SET_MATERIALS_CURRENT_PAGE,
      payload: 11
    });
  });
  it('should set materials pages count', () => {
    expect(setMaterialsPagesCount(11)).toEqual({
      type: SET_MATERIALS_PAGES_COUNT,
      payload: 11
    });
  });
  it('should set materials per page', () => {
    expect(setMaterialsPerPage(11)).toEqual({
      type: SET_MATERIALS_PER_PAGE,
      payload: 11
    });
  });
  it('should add material', () => {
    expect(addMaterial(mockMaterial)).toEqual({
      type: ADD_MATERIAL,
      payload: mockMaterial
    });
  });
  it('should update material', () => {
    const filteredMaterial = mockMaterials.items.filter(
      (item) => item._id === mockId
    );
    const updatedMaterial = {
      ...filteredMaterial,
      name: [
        {
          lang: 'uk',
          value: 'test'
        },
        {
          lang: 'en',
          value: 'test'
        }
      ]
    };
    expect(
      updateMaterial({
        id: mockId,
        material: updatedMaterial
      })
    ).toEqual({
      type: UPDATE_MATERIAL,
      payload: {
        id: mockId,
        material: updatedMaterial
      }
    });
  });
  it('should delete material', () => {
    expect(deleteMaterial(mockMaterial)).toEqual({
      type: DELETE_MATERIAL,
      payload: mockMaterial
    });
  });
  it('should remove material from store', () => {
    expect(removeMaterialFromStore(mockId)).toEqual({
      type: REMOVE_MATERIAL_FROM_STORE,
      payload: mockId
    });
  });
  it('should set show color dialog window to true', () => {
    expect(showColorDialogWindow(true)).toEqual({
      type: SHOW_COLOR_DIALOG_WINDOW,
      payload: true
    });
  });
  it('should set new color to store', () => {
    expect(setNewColorToStore([])).toEqual({
      type: COLOR_DIALOG_DATA_TO_STORE,
      payload: []
    });
  });
  it('should remove colors from store', () => {
    expect(clearColors()).toEqual({
      type: CLEAR_COLORS
    });
  });
});
