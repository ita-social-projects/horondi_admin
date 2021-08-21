import {
  setUsers,
  setUser,
  setUsersLoading,
  setUserError,
  deleteUserLocally,
  setTab,
  setSort,
  setFilter,
  clearFilters
} from '../../users/users.actions';

import {
  mockError,
  mockFilter,
  mockId,
  mockSort,
  mockTab,
  mockUser,
  mockUsersList
} from './users.variables';

import userReducer, { initialState } from '../../users/users.reducer';

describe('Test users reducer', () => {
  it('should return default state', () => {
    expect(userReducer()).toEqual(initialState);
  });

  it('should set all users into state', () => {
    expect(userReducer(initialState, setUsers(mockUsersList.items))).toEqual({
      ...initialState,
      list: mockUsersList.items
    });
  });

  it('should set user into state', () => {
    expect(userReducer(initialState, setUser(mockUser))).toEqual({
      ...initialState,
      user: mockUser
    });
  });

  it('should set users loading into state', () => {
    expect(userReducer(initialState, setUsersLoading(true))).toEqual({
      ...initialState,
      userLoading: true
    });
  });

  it('should set users error into state', () => {
    expect(userReducer(initialState, setUserError(mockError))).toEqual({
      ...initialState,
      userError: mockError
    });
  });

  it('should delete user locally from state', () => {
    expect(
      userReducer(
        {
          ...initialState,
          list: mockUsersList.items
        },
        deleteUserLocally(mockId)
      )
    ).toEqual({
      ...initialState,
      list: [mockUsersList.items[1]]
    });
  });

  it('should set tab into state', () => {
    expect(userReducer(initialState, setTab(mockTab))).toEqual({
      ...initialState,
      tab: mockTab
    });
  });

  it('should set filter into state', () => {
    expect(userReducer(initialState, setFilter(mockFilter))).toEqual({
      ...initialState,
      filters: {
        ...initialState.filters,
        ...mockFilter
      }
    });
  });

  it('should set sort into state', () => {
    expect(userReducer(initialState, setSort(mockSort))).toEqual({
      ...initialState,
      sort: {
        ...mockSort
      }
    });
  });

  it('should clear filters in state', () => {
    expect(userReducer(initialState, clearFilters())).toEqual({
      ...initialState,
      filters: {
        ...initialState.filters
      }
    });
  });
});
