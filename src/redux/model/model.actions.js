import {
  GET_MODELS,
  SET_MODELS,
  SET_MODEL_LOADING,
  DELETE_MODEL,
  ADD_MODEL,
  GET_MODEL,
  SET_MODEL,
  SET_FILTER,
  CLEAR_FILTERS,
  UPDATE_MODEL,
  SET_MODEL_ERROR,
  REMOVE_MODEL_FROM_STORE,
  ADD_CONSTRUCTOR_BASIC_TO_STORE,
  REMOVE_CONSTRUCTOR_BASIC_FROM_STORE,
  EDIT_CONSTRUCTOR_BASIC_IN_STORE,
  ADD_CONSTRUCTOR_BOTTOM_TO_STORE,
  REMOVE_CONSTRUCTOR_BOTTOM_FROM_STORE,
  EDIT_CONSTRUCTOR_BOTTOM_IN_STORE,
  ADD_CONSTRUCTOR_POCKET_TO_STORE,
  REMOVE_CONSTRUCTOR_POCKET_FROM_STORE,
  EDIT_CONSTRUCTOR_POCKET_IN_STORE,
  ADD_CONSTRUCTOR_PATTERN_TO_STORE,
  REMOVE_CONSTRUCTOR_PATTERN_FROM_STORE
} from './model.types';

export const setModels = (payload) => ({
  type: SET_MODELS,
  payload
});

export const getModels = (payload) => ({
  type: GET_MODELS,
  payload
});

export const deleteModel = (payload) => ({
  type: DELETE_MODEL,
  payload
});

export const addModel = (payload) => ({
  type: ADD_MODEL,
  payload
});

export const setModelLoading = (payload) => ({
  type: SET_MODEL_LOADING,
  payload
});

export const updateModel = (payload) => ({
  type: UPDATE_MODEL,
  payload
});

export const setModel = (payload) => ({
  type: SET_MODEL,
  payload
});

export const getModel = (payload) => ({
  type: GET_MODEL,
  payload
});

export const setModelError = (payload) => ({
  type: SET_MODEL_ERROR,
  payload
});

export const removeModelFromStore = (payload) => ({
  type: REMOVE_MODEL_FROM_STORE,
  payload
});

export const addConstructorBasicToStore = (payload) => ({
  type: ADD_CONSTRUCTOR_BASIC_TO_STORE,
  payload
});

export const removeConstructorBasicFromStore = (payload) => ({
  type: REMOVE_CONSTRUCTOR_BASIC_FROM_STORE,
  payload
});

export const editConstructorBasicInStore = (payload) => ({
  type: EDIT_CONSTRUCTOR_BASIC_IN_STORE,
  payload
});

export const addConstructorBottomToStore = (payload) => ({
  type: ADD_CONSTRUCTOR_BOTTOM_TO_STORE,
  payload
});

export const removeConstructorBottomFromStore = (payload) => ({
  type: REMOVE_CONSTRUCTOR_BOTTOM_FROM_STORE,
  payload
});

export const editConstructorBottomInStore = (payload) => ({
  type: EDIT_CONSTRUCTOR_BOTTOM_IN_STORE,
  payload
});

export const addConstructorPocketToStore = (payload) => ({
  type: ADD_CONSTRUCTOR_POCKET_TO_STORE,
  payload
});

export const removeConstructorPocketFromStore = (payload) => ({
  type: REMOVE_CONSTRUCTOR_POCKET_FROM_STORE,
  payload
});

export const editConstructorPocketInStore = (payload) => ({
  type: EDIT_CONSTRUCTOR_POCKET_IN_STORE,
  payload
});

export const addConstructorPatternToStore = (payload) => ({
  type: ADD_CONSTRUCTOR_PATTERN_TO_STORE,
  payload
});

export const removeConstructorPatternFromStore = (payload) => ({
  type: REMOVE_CONSTRUCTOR_PATTERN_FROM_STORE,
  payload
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});

export const clearFilters = () => ({
  type: CLEAR_FILTERS
});
