import {
  getUser,
  getUsers,
  setFilter,
  setSort,
  setTab,
  setUser,
  setUserError,
  setUsers,
  setUsersLoading,
  deleteUser,
  deleteUserLocally,
  clearFilters,
  confirmAdmin,
  validateToken,
  registerAdmin
} from '../../users/users.actions';

import {
  GET_USERS,
  SET_USERS,
  GET_USER,
  SET_USER,
  SET_USERS_ERROR,
  SET_USERS_LOADING,
  DELETE_USER,
  DELETE_USER_LOCALLY,
  REGISTER_ADMIN,
  CONFIRM_ADMIN,
  VALIDATE_TOKEN,
  SET_FILTER,
  SET_SORT,
  SET_TAB,
  CLEAR_FILTERS
} from '../../users/users.types';

import {
  mockUser,
  mockUsersList,
  mockId,
  mockError,
  mockAdmin,
  mockToken,
  mockFilter,
  mockSort,
  mockTab
} from './users.variables';

describe('Test users actions', () => {
  it('should get all users', () => {
    expect(getUsers()).toEqual({
      type: GET_USERS
    });
  });

  it('should set all users', () => {
    expect(setUsers(mockUsersList)).toEqual({
      type: SET_USERS,
      payload: mockUsersList
    });
  });

  it('should set users loading', () => {
    expect(setUsersLoading(true)).toEqual({
      type: SET_USERS_LOADING,
      payload: true
    });
  });

  it('should set user', () => {
    expect(setUser(mockUser)).toEqual({
      type: SET_USER,
      payload: mockUser
    });
  });

  it('should get user by id', () => {
    expect(getUser(mockId)).toEqual({
      type: GET_USER,
      payload: mockId
    });
  });

  it('should delete user by id', () => {
    expect(deleteUser(mockId)).toEqual({
      type: DELETE_USER,
      payload: mockId
    });
  });

  it('should set user error', () => {
    expect(setUserError(mockError)).toEqual({
      type: SET_USERS_ERROR,
      payload: mockError
    });
  });

  it('should delete user locally', () => {
    expect(deleteUserLocally(mockId)).toEqual({
      type: DELETE_USER_LOCALLY,
      payload: mockId
    });
  });

  it('should register admin', () => {
    expect(registerAdmin(mockAdmin)).toEqual({
      type: REGISTER_ADMIN,
      payload: mockAdmin
    });
  });

  it('should confirm admin', () => {
    expect(confirmAdmin(mockAdmin)).toEqual({
      type: CONFIRM_ADMIN,
      payload: mockAdmin
    });
  });

  it('should validate token', () => {
    expect(validateToken(mockToken)).toEqual({
      type: VALIDATE_TOKEN,
      payload: mockToken
    });
  });

  it('should set filter', () => {
    expect(setFilter(mockFilter)).toEqual({
      type: SET_FILTER,
      payload: mockFilter
    });
  });

  it('should clear filters', () => {
    expect(clearFilters()).toEqual({
      type: CLEAR_FILTERS
    });
  });

  it('should set sort', () => {
    expect(setSort(mockSort)).toEqual({
      type: SET_SORT,
      payload: mockSort
    });
  });

  it('should set tab', () => {
    expect(setTab(mockTab)).toEqual({
      type: SET_TAB,
      payload: mockTab
    });
  });
});
