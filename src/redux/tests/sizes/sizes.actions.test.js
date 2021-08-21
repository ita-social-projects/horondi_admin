import {
  GET_SIZES,
  SET_SIZES,
  GET_SIZE,
  SET_SIZE,
  ADD_SIZE,
  ADD_SIZE_TO_STATE,
  UPDATE_SIZE,
  DELETE_SIZE,
  REMOVE_SIZE_FROM_STATE,
  SET_SIZES_LOADING,
  SET_SIZES_ERROR,
  SHOW_SIZE_DIALOG_WINDOW
} from '../../sizes/sizes.types';

import { mockSize, mockSizes, mockError, mockId } from './sizes.variables';

import {
  getSize,
  getSizes,
  addSize,
  addSizeToState,
  updateSize,
  removeSizeFromState,
  deleteSize,
  showSizeDialogWindow,
  setSizesLoading,
  setSizesError,
  setSize,
  setSizes
} from '../../sizes/sizes.actions';

describe('size actions test', () => {
  it('should get sizes', () => {
    expect(getSizes()).toEqual({ type: GET_SIZES });
  });

  it('should get size', () => {
    expect(getSize(mockSize)).toEqual({
      type: GET_SIZE,
      payload: mockSize
    });
  });

  it('should set sizes', () => {
    expect(setSizes(mockSizes)).toEqual({
      type: SET_SIZES,
      payload: mockSizes
    });
  });

  it('should set size', () => {
    expect(setSize(mockSize)).toEqual({
      type: SET_SIZE,
      payload: mockSize
    });
  });

  it('should add size', () => {
    expect(addSize(mockSizes)).toEqual({
      type: ADD_SIZE,
      payload: mockSizes
    });
  });

  it('Should add size to state', () => {
    expect(addSizeToState(mockSize)).toEqual({
      type: ADD_SIZE_TO_STATE,
      payload: mockSize
    });
  });

  it('Should delete size', () => {
    expect(deleteSize(mockSize)).toEqual({
      type: DELETE_SIZE,
      payload: mockSize
    });
  });

  it('Should remove size from state', () => {
    expect(removeSizeFromState(mockSize)).toEqual({
      type: REMOVE_SIZE_FROM_STATE,
      payload: mockSize
    });
  });

  it('should update size', () => {
    const filteredSize = mockSizes.items.filter((item) => item._id === mockId);
    const updatedSize = {
      ...filteredSize,
      name: mockSizes.items.name
    };
    expect(
      updateSize({
        id: mockId,
        size: updatedSize
      })
    ).toEqual({
      type: UPDATE_SIZE,
      payload: {
        id: mockId,
        size: updatedSize
      }
    });
  });

  it('should set sizes loading', () => {
    expect(setSizesLoading(true)).toEqual({
      type: SET_SIZES_LOADING,
      payload: true
    });
  });

  it('should set sizes error', () => {
    expect(setSizesError(mockError)).toEqual({
      type: SET_SIZES_ERROR,
      payload: mockError
    });
  });

  it('should show size dialog window', () => {
    expect(showSizeDialogWindow(true)).toEqual({
      type: SHOW_SIZE_DIALOG_WINDOW,
      payload: true
    });
  });
});
