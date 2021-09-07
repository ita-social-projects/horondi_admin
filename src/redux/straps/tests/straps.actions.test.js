import {
  ADD_STRAP,
  GET_STRAPS,
  SET_STRAPS,
  SET_STRAPS_LOADING,
  DELETE_STRAP,
  REMOVE_STRAP_FROM_STATE,
  GET_STRAP,
  SET_STRAP,
  UPDATE_STRAP,
  SET_STRAPS_FILTER,
  CLEAR_STRAPS_FILTER
} from '../straps.types';
import {
  addStraps,
  getAllStraps,
  setStraps,
  setStrapsLoading,
  deleteStrap,
  removeStrapFromState,
  getStrap,
  setStrap,
  updateStrap,
  setFilter,
  clearFilters
} from '../straps.actions';

const actionsPayload = ['custom payload'];

describe('straps.actions tests', () => {
  it('should return expected addStraps result', () => {
    const result = addStraps(actionsPayload);

    expect(result).toEqual({ type: ADD_STRAP, payload: actionsPayload });
  });

  it('should return expected getAllStraps result', () => {
    const result = getAllStraps(actionsPayload);

    expect(result).toEqual({ type: GET_STRAPS, payload: actionsPayload });
  });

  it('should return expected setStraps result', () => {
    const result = setStraps(actionsPayload);

    expect(result).toEqual({ type: SET_STRAPS, payload: actionsPayload });
  });

  it('should return expected setStrapsLoading result', () => {
    const result = setStrapsLoading(actionsPayload);

    expect(result).toEqual({
      type: SET_STRAPS_LOADING,
      payload: actionsPayload
    });
  });

  it('should return expected deleteStrap result', () => {
    const result = deleteStrap(actionsPayload);

    expect(result).toEqual({ type: DELETE_STRAP, payload: actionsPayload });
  });

  it('should return expected removeStrapFromState result', () => {
    const result = removeStrapFromState(actionsPayload);

    expect(result).toEqual({
      type: REMOVE_STRAP_FROM_STATE,
      payload: actionsPayload
    });
  });

  it('should return expected getStrap result', () => {
    const result = getStrap(actionsPayload);

    expect(result).toEqual({ type: GET_STRAP, payload: actionsPayload });
  });

  it('should return expected setStrap result', () => {
    const result = setStrap(actionsPayload);

    expect(result).toEqual({ type: SET_STRAP, payload: actionsPayload });
  });

  it('should return expected updateStrap result', () => {
    const result = updateStrap(actionsPayload);

    expect(result).toEqual({ type: UPDATE_STRAP, payload: actionsPayload });
  });

  it('should return expected setFilter result', () => {
    const result = setFilter(actionsPayload);

    expect(result).toEqual({
      type: SET_STRAPS_FILTER,
      payload: actionsPayload
    });
  });

  it('should return expected clearFilters result', () => {
    const result = clearFilters(actionsPayload);

    expect(result).toEqual({ type: CLEAR_STRAPS_FILTER });
  });
});
