import {
  GET_MATERIAL,
  DELETE_MATERIAL,
  UPDATE_MATERIAL,
  GET_MATERIALS,
  SET_MATERIAL,
  SET_MATERIALS,
  SET_MATERIALS_CURRENT_PAGE,
  SET_MATERIAL_ERROR,
  SET_MATERIAL_LOADING,
  SET_MATERIALS_PAGES_COUNT,
  SET_MATERIALS_PER_PAGE,
  ADD_MATERIAL,
  REMOVE_MATERIAL_FROM_STORE,
  SET_COLOR_FILTER
} from './material.types';

export const getMaterials = (payload) => ({
  type: GET_MATERIALS,
  payload
});

export const setMaterials = (payload) => ({
  type: SET_MATERIALS,
  payload
});

export const setMaterialsCurrentPage = (payload) => ({
  type: SET_MATERIALS_CURRENT_PAGE,
  payload
});

export const setMaterialsPerPage = (payload) => ({
  type: SET_MATERIALS_PER_PAGE,
  payload
});

export const setMaterialsPagesCount = (payload) => ({
  type: SET_MATERIALS_PAGES_COUNT,
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

export const setColorFilter = (payload) => ({
  type: SET_COLOR_FILTER,
  payload
});
