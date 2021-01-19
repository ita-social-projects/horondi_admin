import {
  ADD_CONSTRUCTOR_BASIC,
  ADD_CONSTRUCTOR_BOTTOM,
  ADD_CONSTRUCTOR_FRONT_POCKET,
  ADD_CONSTRUCTOR_PATTERN,
  DELETE_CONSTRUCTOR_BASIC,
  DELETE_CONSTRUCTOR_BOTTOM,
  DELETE_CONSTRUCTOR_FRONT_POCKET,
  DELETE_CONSTRUCTOR_PATTERN,
  SET_CONSTRUCTOR_ELEMENT_METHOD,
  SET_CONSTRUCTOR_TABS,
  SET_EDITABLE_CONSTRUCTOR_ELEMENT,
  UPDATE_CONSTRUCTOR_BASIC,
  UPDATE_CONSTRUCTOR_BOTTOM,
  UPDATE_CONSTRUCTOR_FRONT_POCKET
} from './constructor.types';

export const deleteConstructorBasic = (payload) => ({
  type: DELETE_CONSTRUCTOR_BASIC,
  payload
});

export const addConstructorBasic = (payload) => ({
  type: ADD_CONSTRUCTOR_BASIC,
  payload
});

export const updateConstructorBasic = (payload) => ({
  type: UPDATE_CONSTRUCTOR_BASIC,
  payload
});

export const deleteConstructorFrontPocket = (payload) => ({
  type: DELETE_CONSTRUCTOR_FRONT_POCKET,
  payload
});

export const addConstructorFrontPocket = (payload) => ({
  type: ADD_CONSTRUCTOR_FRONT_POCKET,
  payload
});

export const updateConstructorFrontPocket = (payload) => ({
  type: UPDATE_CONSTRUCTOR_FRONT_POCKET,
  payload
});

export const deleteConstructorBottom = (payload) => ({
  type: DELETE_CONSTRUCTOR_BOTTOM,
  payload
});

export const addConstructorBottom = (payload) => ({
  type: ADD_CONSTRUCTOR_BOTTOM,
  payload
});

export const updateConstructorBottom = (payload) => ({
  type: UPDATE_CONSTRUCTOR_BOTTOM,
  payload
});

export const setConstructorElementMethod = (payload) => ({
  type: SET_CONSTRUCTOR_ELEMENT_METHOD,
  payload
});

export const setEditableConstructorElement = (payload) => ({
  type: SET_EDITABLE_CONSTRUCTOR_ELEMENT,
  payload
});

export const setConstructorTabs = (payload) => ({
  type: SET_CONSTRUCTOR_TABS,
  payload
});

export const deleteConstructorPattern = (payload) => ({
  type: DELETE_CONSTRUCTOR_PATTERN,
  payload
});

export const addConstructorPattern = (payload) => ({
  type: ADD_CONSTRUCTOR_PATTERN,
  payload
});
