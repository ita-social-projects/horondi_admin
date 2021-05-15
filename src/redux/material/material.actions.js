import {
  GET_MATERIAL,
  DELETE_MATERIAL,
  UPDATE_MATERIAL,
  GET_MATERIALS,
  SET_MATERIAL,
  SET_MATERIALS,
  SET_MATERIAL_ERROR,
  SET_MATERIAL_LOADING,
  ADD_MATERIAL,
  REMOVE_MATERIAL_FROM_STORE,
  GET_MATERIALS_BY_PURPOSE,
  SET_MATERIALS_BY_PURPOSE, SET_MATERIAL_FILTER, CLEAR_MATERIAL_FILTERS
} from './material.types';

export const getMaterials = (payload) => ({
  type: GET_MATERIALS,
  payload
});

export const setMaterials = (payload) => ({
  type: SET_MATERIALS,
  payload
});

export const getMaterial = (payload) => ({
  type: GET_MATERIAL,
  payload
});

export const setMaterial = (payload) => ({
  type: SET_MATERIAL,
  payload
});

export const deleteMaterial = (payload) => ({
  type: DELETE_MATERIAL,
  payload
});

export const addMaterial = (payload) => ({
  type: ADD_MATERIAL,
  payload
});

export const setMaterialLoading = (payload) => ({
  type: SET_MATERIAL_LOADING,
  payload
});

export const updateMaterial = (payload) => ({
  type: UPDATE_MATERIAL,
  payload
});

export const setMaterialError = (payload) => ({
  type: SET_MATERIAL_ERROR,
  payload
});

export const removeMaterialFromStore = (payload) => ({
  type: REMOVE_MATERIAL_FROM_STORE,
  payload
});

export const setMaterialFilter = (payload) => ({
  type: SET_MATERIAL_FILTER,
  payload
});

export const getMaterialsByPurpose = () => ({
  type: GET_MATERIALS_BY_PURPOSE
});

export const setMaterialsByPurpose = (payload) => ({
  type: SET_MATERIALS_BY_PURPOSE,
  payload
});

export const clearMaterialFilters = () => ({
  type: CLEAR_MATERIAL_FILTERS,
});
