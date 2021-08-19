import bottomReducer, { initialState } from '../../bottom/bottom.reducer';
import {
  mockBottoms,
  mockId,
  filter,
  mockInitialFilters,
  mockBottomsLoadPayload
} from './bottom.variables';
import {
  setBottomError,
  setBottomLoading,
  setBottoms,
  setBottom,
  removeBottomFromStore,
  clearFilters,
  setFilter,
  clearBottom
} from '../../bottom/bottom.actions';

describe('reducer tests', () => {
  it('should return default state', () => {
    expect(bottomReducer()).toEqual(initialState);
  });

  it('should set bottom to store', () => {
    expect(
      bottomReducer(initialState, setBottom(mockBottoms.items[0]))
    ).toEqual({
      ...initialState,
      bottom: mockBottoms.items[0]
    });
  });
  it('should set bottom loading to true', () => {
    expect(bottomReducer(initialState, setBottomLoading(true))).toEqual({
      ...initialState,
      bottomLoading: true
    });
  });
  it('should set bottom error to true', () => {
    expect(bottomReducer(initialState, setBottomError(true))).toEqual({
      ...initialState,
      bottomError: true
    });
  });
  it('should set bottoms to store', () => {
    expect(bottomReducer(initialState, setBottoms(mockBottoms.items))).toEqual({
      ...initialState,
      list: mockBottoms.items
    });
  });
  it('should remove bottom from store', () => {
    const state = { ...initialState, list: mockBottoms.items };
    const filteredBottoms = mockBottoms.items.filter(
      (bottomEl) => bottomEl._id !== mockId
    );
    expect(bottomReducer(state, removeBottomFromStore(mockId))).toEqual({
      ...state,
      list: filteredBottoms
    });
  });
  it('should set filter for bottoms', () => {
    expect(bottomReducer(initialState, setFilter(filter))).toEqual({
      ...initialState,
      filters: {
        ...mockInitialFilters,
        ...filter
      }
    });
  });
  it('should clear bottom', () => {
    expect(bottomReducer(initialState, clearBottom())).toEqual({
      ...initialState,
      bottom: null
    });
  });

  it('should clear all bottoms filters', () => {
    expect(bottomReducer(initialState, clearFilters())).toEqual({
      ...initialState,
      filters: mockBottomsLoadPayload.filters
    });
  });
});
