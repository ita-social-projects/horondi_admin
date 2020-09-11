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
  showColorDialogWindow
} from '../material.actions';
import {
  material,
  materials,
  materialToUpdateDeleteId,
  newColor
} from './material.variables';
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
  SHOW_COLOR_DIALOG_WINDOW
} from '../material.types';

describe('material actions tests', () => {
  it('should get materials', () => {
    expect(getMaterials(materials)).toEqual({
      type: GET_MATERIALS,
      payload: materials
    });
  });
  it('should set materials', () => {
    expect(setMaterials(materials)).toEqual({
      type: SET_MATERIALS,
      payload: materials
    });
  });

  it('should get material', () => {
    expect(getMaterial(material)).toEqual({
      type: GET_MATERIAL,
      payload: material
    });
  });
  it('should set material', () => {
    expect(setMaterial(material)).toEqual({
      type: SET_MATERIAL,
      payload: material
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
    expect(addMaterial(material)).toEqual({
      type: ADD_MATERIAL,
      payload: material
    });
  });
  it('should update material', () => {
    const filteredMaterial = materials.filter(
      (item) => item._id === materialToUpdateDeleteId
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
        id: materialToUpdateDeleteId,
        material: updatedMaterial
      })
    ).toEqual({
      type: UPDATE_MATERIAL,
      payload: {
        id: materialToUpdateDeleteId,
        material: updatedMaterial
      }
    });
  });
  it('should delete material', () => {
    expect(deleteMaterial(materialToUpdateDeleteId)).toEqual({
      type: DELETE_MATERIAL,
      payload: materialToUpdateDeleteId
    });
  });
  it('should remove material from store', () => {
    expect(removeMaterialFromStore(materialToUpdateDeleteId)).toEqual({
      type: REMOVE_MATERIAL_FROM_STORE,
      payload: materialToUpdateDeleteId
    });
  });
  it('should set show color dialog window to true', () => {
    expect(showColorDialogWindow).toEqual({
      type: SHOW_COLOR_DIALOG_WINDOW,
      payload: true
    });
  });
  it('should set new color to store', () => {
    expect(setNewColorToStore(newColor)).toEqual({
      type: COLOR_DIALOG_DATA_TO_STORE,
      payload: newColor
    });
  });
});
