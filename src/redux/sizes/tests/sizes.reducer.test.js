import sizeReducer, { initialState } from '../sizes.reducer';
import {
  addSizeToState,
  removeSizeFromState,
  showSizeDialogWindow,
  setSizesLoading,
  setSizesError,
  setSize,
  setSizes
} from '../sizes.actions';
import { mockSizes, mockId, mockError } from './sizes.variables';

describe('size reducer tests', () => {
  it('should return default value', () => {
    expect(sizeReducer()).toEqual(initialState);
  });

  it('should return default value', () => {
    expect(sizeReducer(initialState)).toEqual(initialState);
  });
  it('should set sizes to store', () => {
    expect(sizeReducer(initialState, setSizes(mockSizes.items))).toEqual({
      ...initialState,
      list: mockSizes.items
    });
  });

  it('should set sizes loading to true', () => {
    expect(sizeReducer(initialState, setSizesLoading(true))).toEqual({
      ...initialState,
      sizesLoading: true
    });
  });

  it('should set sizes error to true', () => {
    expect(sizeReducer(initialState, setSizesError(mockError))).toEqual({
      ...initialState,
      sizeError: mockError
    });
  });

  it('should remove size from store', () => {
    const filteredSizes = mockSizes.items.filter((item) => item._id !== mockId);
    const state = { ...initialState, list: mockSizes.items };
    expect(sizeReducer(state, removeSizeFromState(mockId))).toEqual({
      ...initialState,
      list: filteredSizes
    });
  });

  it('should add size to state', () => {
    expect(sizeReducer(initialState, addSizeToState(mockSizes.items))).toEqual({
      ...initialState,
      list: [mockSizes.items]
    });
  });

  it('should set size', () => {
    expect(sizeReducer(initialState, setSize(mockSizes.items))).toEqual({
      ...initialState,
      size: mockSizes.items
    });
  });

  it('should show size dialog window', () => {
    expect(sizeReducer(initialState, showSizeDialogWindow(true))).toEqual({
      ...initialState,
      showSizeDialogWindow: true
    });
  });
});
