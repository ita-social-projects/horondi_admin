import { expectSaga } from 'redux-saga-test-plan';
import { call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { combineReducers } from 'redux';
import {
  getAllUsers,
  getUserById,
  deleteUser,
  switchUserStatus,
  registerAdmin,
  completeAdminRegister,
  validateToken
} from '../users.operations';

import {
  handleUserLoad,
  handleUsersLoad,
  handleUsersDelete,
  handleSnackBarSuccess,
  handleUserStatusSwitch,
  handleAdminRegister,
  handleAdminConfirm,
  handleTokenValidation,
  handleUsersError
} from '../users.saga';

import { selectUsersAndTable } from '../../selectors/users.selectors';

import {
  mockUsersState,
  mockTableState,
  mockUsersList,
  pageCount,
  statuses,
  adminInput,
  mockUser,
  mockAdmin,
  mockToken,
  mockError,
  mockSnackarState,
  mockStatus
} from './users.variables';

import {
  setUsersLoading,
  setUsers,
  setUser,
  setUserError,
  deleteUserLocally,
  updateUserLocally
} from '../users.actions';

import { setPagesCount, setItemsCount } from '../../table/table.actions';

import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../../snackbar/snackbar.actions';

import {
  SET_USERS_LOADING,
  SET_USER,
  DELETE_USER_LOCALLY,
  UPDATE_USER_LOCALLY,
  SET_USERS_ERROR,
  SET_USERS
} from '../users.types';

import { SET_PAGES_COUNT, SET_ITEMS_COUNT } from '../../table/table.types';

import {
  SET_SNACKBAR_MESSAGE,
  SET_SNACKBAR_SEVERITY,
  SET_SNACKBAR_STATUS
} from '../../snackbar/snackbar.types';

import Users from '../users.reducer';
import Table from '../../table/table.reducer';
import Snackbar from '../../snackbar/snackbar.reducer';

const {
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS,
  SUCCESS_CONFIRMATION_STATUS,
  SUCCESS_CREATION_STATUS
} = statuses;

describe('Users saga test', () => {
  const filterAnalysis = (analysis) => ({
    analysisPut: analysis.filter((e) => e.type === 'PUT'),
    analysisCall: analysis.filter((e) => e.type === 'CALL')
  });

  it('should load all users', () =>
    expectSaga(handleUsersLoad)
      .withReducer(
        combineReducers({
          Users,
          Table
        }),
        {
          Users: mockUsersState,
          Table: mockTableState
        }
      )
      .provide([
        [
          select(selectUsersAndTable),
          {
            usersState: mockUsersState,
            tableState: mockTableState
          }
        ],
        [call(getAllUsers, mockUsersState, mockTableState), mockUsersList]
      ])
      .put(setUsersLoading(true))
      .put(setPagesCount(pageCount))
      .put(setItemsCount(mockUsersList.count))
      .put(setUsers(mockUsersList.items))
      .put(setUsersLoading(false))
      .hasFinalState({
        Users: {
          ...mockUsersState,
          list: mockUsersList.items
        },
        Table: {
          ...mockTableState,
          itemsCount: mockUsersList.count,
          pagination: {
            ...mockTableState.pagination,
            pagesCount: pageCount
          }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(7);

        const { analysisPut, analysisCall } = filterAnalysis(analysis);

        expect(analysisPut).toHaveLength(5);
        expect(analysisCall).toHaveLength(1);

        expect(analysisPut[0]).toEqual(
          put({ type: SET_USERS_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: SET_PAGES_COUNT, payload: 1 })
        );
        expect(analysisPut[2]).toEqual(
          put({ type: SET_ITEMS_COUNT, payload: 5 })
        );
        expect(analysisPut[3]).toEqual(
          put({ type: SET_USERS, payload: mockUsersList.items })
        );
        expect(analysisPut[4]).toEqual(
          put({ type: SET_USERS_LOADING, payload: false })
        );
      }));

  it('should load all user by id', () =>
    expectSaga(handleUserLoad, { payload: mockUser._id })
      .withReducer(combineReducers({ Users }), { Users: mockUsersState })
      .put(setUsersLoading(true))
      .provide([[call(getUserById, mockUser._id), mockUser]])
      .put(setUser(mockUser))
      .put(setUsersLoading(false))
      .hasFinalState({
        Users: {
          ...mockUsersState,
          user: mockUser
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(4);

        const { analysisPut, analysisCall } = filterAnalysis(analysis);

        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);

        expect(analysisPut[0]).toEqual(
          put({ type: SET_USERS_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: SET_USER, payload: mockUser })
        );
        expect(analysisPut[2]).toEqual(
          put({ type: SET_USERS_LOADING, payload: false })
        );
      }));

  it('should delete user by id', () =>
    expectSaga(handleUsersDelete, { payload: mockUser._id })
      .withReducer(combineReducers({ Users }), {
        Users: {
          ...mockUsersState,
          list: mockUsersList.items
        }
      })
      .put(setUsersLoading(true))
      .provide([
        [call(deleteUser, mockUser._id)],
        [call(handleSnackBarSuccess, SUCCESS_DELETE_STATUS)]
      ])
      .put(deleteUserLocally(mockUser._id))
      .put(setUsersLoading(false))
      .hasFinalState({
        Users: {
          ...mockUsersState,
          list: mockUsersList.items.filter((user) => user._id !== mockUser._id)
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(5);

        const { analysisPut, analysisCall } = filterAnalysis(analysis);

        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(2);

        expect(analysisPut[0]).toEqual(
          put({ type: SET_USERS_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: DELETE_USER_LOCALLY, payload: mockUser._id })
        );
        expect(analysisPut[2]).toEqual(
          put({ type: SET_USERS_LOADING, payload: false })
        );
      })
      .catch((err) => {
        throw err;
      }));

  it('should switch user status', () =>
    expectSaga(handleUserStatusSwitch, { payload: mockUser._id })
      .withReducer(combineReducers({ Users }), {
        Users: {
          ...mockUsersState,
          user: mockUser
        }
      })
      .put(setUsersLoading(true))
      .provide([
        [call(switchUserStatus, mockUser._id)],
        [call(handleSnackBarSuccess, SUCCESS_UPDATE_STATUS)]
      ])
      .put(updateUserLocally(mockUser._id))
      .put(setUsersLoading(false))
      .hasFinalState({
        Users: {
          ...mockUsersState,
          user: { ...mockUser, banned: !mockUser.banned }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(5);

        const { analysisPut, analysisCall } = filterAnalysis(analysis);

        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(2);

        expect(analysisPut[0]).toEqual(
          put({ type: SET_USERS_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: UPDATE_USER_LOCALLY, payload: mockUser._id })
        );
        expect(analysisPut[2]).toEqual(
          put({ type: SET_USERS_LOADING, payload: false })
        );
      })
      .catch((err) => {
        throw err;
      }));

  it('should register admin', () =>
    expectSaga(handleAdminRegister, { payload: adminInput })
      .withReducer(combineReducers({ Users }), {
        Users: mockUsersState
      })
      .put(setUsersLoading(true))
      .provide([
        [call(registerAdmin, adminInput)],
        [call(handleSnackBarSuccess, SUCCESS_CREATION_STATUS)]
      ])
      .put(setUsersLoading(false))
      .put(push('/users'))
      .hasFinalState({
        Users: mockUsersState
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(5);

        const { analysisPut, analysisCall } = filterAnalysis(analysis);

        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(2);

        expect(analysisPut[0]).toEqual(
          put({ type: SET_USERS_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: SET_USERS_LOADING, payload: false })
        );
        expect(analysisPut[2]).toEqual(
          put({
            type: '@@router/CALL_HISTORY_METHOD',
            payload: { method: 'push', args: ['/users'] }
          })
        );
      })
      .catch((err) => {
        throw err;
      }));

  it('should confirm admin', () =>
    expectSaga(handleAdminConfirm, { payload: mockAdmin })
      .withReducer(combineReducers({ Users }), {
        Users: mockUsersState
      })
      .put(setUsersLoading(true))
      .provide([
        [call(completeAdminRegister, mockAdmin)],
        [call(handleSnackBarSuccess, SUCCESS_CONFIRMATION_STATUS)]
      ])
      .put(setUsersLoading(false))
      .put(push('/'))
      .hasFinalState({
        Users: mockUsersState
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(5);

        const { analysisPut, analysisCall } = filterAnalysis(analysis);

        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(2);

        expect(analysisPut[0]).toEqual(
          put({ type: SET_USERS_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: SET_USERS_LOADING, payload: false })
        );
        expect(analysisPut[2]).toEqual(
          put({
            type: '@@router/CALL_HISTORY_METHOD',
            payload: { method: 'push', args: ['/'] }
          })
        );
      })
      .catch((err) => {
        throw err;
      }));

  it('should valiadte token', () =>
    expectSaga(handleTokenValidation, { payload: mockToken })
      .withReducer(combineReducers({ Users }), {
        Users: mockUsersState
      })
      .put(setUsersLoading(true))
      .provide([[call(validateToken, mockToken)]])
      .put(setUsersLoading(false))
      .hasFinalState({
        Users: mockUsersState
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(3);

        const { analysisPut, analysisCall } = filterAnalysis(analysis);

        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(1);

        expect(analysisPut[0]).toEqual(
          put({ type: SET_USERS_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: SET_USERS_LOADING, payload: false })
        );
      })
      .catch((err) => {
        throw err;
      }));

  it('should handle users error', () =>
    expectSaga(handleUsersError, mockError)
      .withReducer(combineReducers({ Users, Snackbar }), {
        Users: {
          ...mockUsersState,
          userLoading: true
        },
        Snackbar: mockSnackarState
      })
      .put(setUsersLoading(false))
      .put(setUserError({ e: mockError }))
      .put(setSnackBarSeverity('error'))
      .put(setSnackBarMessage(mockError.payload.message))
      .put(setSnackBarStatus(true))
      .hasFinalState({
        Users: {
          ...mockUsersState,
          userLoading: false,
          userError: { e: mockError }
        },
        Snackbar: {
          snackBarStatus: true,
          snackBarSeverity: 'error',
          snackBarMessage: 'error'
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(5);

        const { analysisPut, analysisCall } = filterAnalysis(analysis);

        expect(analysisPut).toHaveLength(5);
        expect(analysisCall).toHaveLength(0);

        expect(analysisPut[0]).toEqual(
          put({ type: SET_USERS_LOADING, payload: false })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: SET_USERS_ERROR, payload: { e: mockError } })
        );
        expect(analysisPut[2]).toEqual(
          put({ type: SET_SNACKBAR_SEVERITY, payload: 'error' })
        );
        expect(analysisPut[3]).toEqual(
          put({
            type: SET_SNACKBAR_MESSAGE,
            payload: mockError.payload.message
          })
        );
        expect(analysisPut[4]).toEqual(
          put({ type: SET_SNACKBAR_STATUS, payload: true })
        );
      })
      .catch((err) => {
        throw err;
      }));

  it('should handle snackbar success', () =>
    expectSaga(handleSnackBarSuccess, mockStatus)
      .withReducer(combineReducers({ Snackbar }), {
        Snackbar: mockSnackarState
      })
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(mockStatus))
      .put(setSnackBarStatus(true))
      .hasFinalState({
        Snackbar: {
          snackBarStatus: true,
          snackBarSeverity: 'success',
          snackBarMessage: mockStatus
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(3);

        const { analysisPut, analysisCall } = filterAnalysis(analysis);

        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(0);

        expect(analysisPut[0]).toEqual(
          put({ type: SET_SNACKBAR_SEVERITY, payload: 'success' })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: SET_SNACKBAR_MESSAGE, payload: mockStatus })
        );
        expect(analysisPut[2]).toEqual(
          put({ type: SET_SNACKBAR_STATUS, payload: true })
        );
      })
      .catch((err) => {
        throw err;
      }));
});
