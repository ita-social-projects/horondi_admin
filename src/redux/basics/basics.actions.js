import { ADD_BASICS, GET_BASICS } from './basics.types';

export const addBasics = (payload) => ({
  type: ADD_BASICS,
  payload
});

export const getAllBasics = (payload) => ({
  type: GET_BASICS,
  payload
});
