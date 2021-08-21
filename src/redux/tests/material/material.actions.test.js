import {
  setMaterial,
  setMaterials,
  getMaterial,
  getMaterials,
  setMaterialError,
  setMaterialLoading,
  addMaterial,
  updateMaterial,
  deleteMaterial
} from '../../material/material.actions';
import { mockMaterial, mockMaterials } from './material.variables';
import {
  GET_MATERIALS,
  SET_MATERIALS,
  GET_MATERIAL,
  SET_MATERIAL,
  SET_MATERIAL_LOADING,
  SET_MATERIAL_ERROR,
  ADD_MATERIAL,
  UPDATE_MATERIAL,
  DELETE_MATERIAL
} from '../../material/material.types';
import { mockId } from '../model/model.variables';

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
          lang: 'ua',
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
});
