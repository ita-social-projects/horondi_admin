import basicReducer, { initialState } from '../basics.reducer';
import {
  mockBasics,
  mockId,
  filter,
  mockInitialFilters,
  mockBasicsLoadPayload
} from './basics.variables';
import {
  setFilter,
  setBasicsLoading,
  setBasic,
  setBasics,
  removeBasicFromState,
  clearFilters
} from '../basics.actions';

describe('Basics reducer tests', () => {
  it('should return default state', () => {
    expect(basicReducer()).toEqual(initialState);
  });

  it('should set basic to store', () => {
    expect(
      basicReducer(initialState, setBasic(mockBasics.list.items[0]))
    ).toEqual({
      ...initialState,
      basic: mockBasics.list.items[0]
    });
  });

  it('should set basic loading to true', () => {
    expect(basicReducer(initialState, setBasicsLoading(true))).toEqual({
      ...initialState,
      basicsLoading: true
    });
  });

  it('should set basics to state', () => {
    expect(
      basicReducer(initialState, setBasics(mockBasics.list.items))
    ).toEqual({
      ...initialState,
      list: mockBasics.list.items
    });
  });

  it('should remove basic from store', () => {
    const state = { ...initialState, list: { items: [mockBasics.list.items] } };
    const filteredBasics = mockBasics.list.items.filter(
      (backEl) => backEl._id !== mockId
    );
    expect(
      basicReducer(state, removeBasicFromState(mockBasics.list.items._id))
    ).toEqual({
      ...state,
      list: filteredBasics
    });
  });

  it('should set filter for basics', () => {
    expect(basicReducer(initialState, setFilter(filter))).toEqual({
      ...initialState,
      filter: {
        ...mockInitialFilters,
        name: filter.name
      }
    });
  });

  it('should clear all basics filters', () => {
    expect(basicReducer(initialState, clearFilters())).toEqual({
      ...initialState,
      filter: mockBasicsLoadPayload.filters
    });
  });
});
