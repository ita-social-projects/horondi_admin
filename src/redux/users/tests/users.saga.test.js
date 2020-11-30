import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';
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

import Users from '../users.reducer';
import Table from '../../table/table.reducer';
import Snackbar from '../../snackbar/snackbar.reducer';
import { handleSuccessSnackbar } from '../../snackbar/snackbar.sagas';

const {
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS,
  SUCCESS_CONFIRMATION_STATUS,
  SUCCESS_CREATION_STATUS
} = statuses;

describe('Users saga test', () => {
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
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        const analysisSelect = analysis.filter((e) => e.type === 'SELECT');
        expect(analysisPut).toHaveLength(5);
        expect(analysisCall).toHaveLength(1);
        expect(analysisSelect).toHaveLength(1);
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
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
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
        [call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)]
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
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(2);
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
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
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
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(2);
      }));

  it('should register admin', () =>
    expectSaga(handleAdminRegister, { payload: adminInput })
      .withReducer(combineReducers({ Users }), {
        Users: mockUsersState
      })
      .put(setUsersLoading(true))
      .provide([
        [call(registerAdmin, adminInput)],
        [call(handleSuccessSnackbar, SUCCESS_CREATION_STATUS)]
      ])
      .put(push('/users'))
      .put(setUsersLoading(false))
      .hasFinalState({
        Users: mockUsersState
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisCall).toHaveLength(2);
        expect(analysisPut).toHaveLength(3);
      }));

  it('should confirm admin', () =>
    expectSaga(handleAdminConfirm, { payload: mockAdmin })
      .withReducer(combineReducers({ Users }), {
        Users: mockUsersState
      })
      .put(setUsersLoading(true))
      .provide([
        [call(completeAdminRegister, mockAdmin)],
        [call(handleSuccessSnackbar, SUCCESS_CONFIRMATION_STATUS)]
      ])
      .put(setUsersLoading(false))
      .put(push('/'))
      .hasFinalState({
        Users: mockUsersState
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(2);
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
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(1);
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
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(5);
      }));
});
