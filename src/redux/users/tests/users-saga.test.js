import { expectSaga } from 'redux-saga-test-plan';
import { call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

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

import {
  mockUsersState,
  mockTableState,
  mockUsersList,
  statuses,
  adminInput
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
  SET_USERS_ERROR
} from '../users.types';

import {
  SET_SNACKBAR_MESSAGE,
  SET_SNACKBAR_SEVERITY,
  SET_SNACKBAR_STATUS
} from '../../snackbar/snackbar.types';

const {
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS,
  SUCCESS_CONFIRMATION_STATUS,
  SUCCESS_CREATION_STATUS
} = statuses;

describe('Users saga test', () => {
  it('should load all users', () =>
    expectSaga(handleUsersLoad)
      .withState({
        Users: mockUsersState,
        Table: mockTableState
      })
      .put(setUsersLoading(true))
      .provide([
        [call(getAllUsers, mockUsersState, mockTableState), mockUsersList]
      ])
      .put(setPagesCount(mockUsersList.count))
      .put(setItemsCount(mockUsersList.count))
      .put(setUsers(mockUsersList.items))
      .put(setUsersLoading(false))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        let analysisPut = analysis.filter((e) => e.type === 'PUT');
        let analysisCall = analysis.filter((e) => e.type === 'CALL');

        analysisPut = analysisPut.map((el) => el.payload.action);
        analysisCall = analysisCall.map((el) => el.payload);
        console.log(analysisPut);
        console.log(analysisCall);
      }));

  it('should load all user by id', () => {
    const user = mockUsersList.items[0];

    return expectSaga(handleUserLoad, { payload: user._id })
      .put(setUsersLoading(true))
      .provide([[call(getUserById, user._id), user]])
      .put(setUser(user))
      .put(setUsersLoading(false))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(4);
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);

        expect(analysisPut[0]).toEqual(
          put({ type: SET_USERS_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(put({ type: SET_USER, payload: user }));
        expect(analysisPut[2]).toEqual(
          put({ type: SET_USERS_LOADING, payload: false })
        );
      });
  });

  it('should delete user by id', () => {
    const user = mockUsersList.items[0];

    return expectSaga(handleUsersDelete, { payload: user._id })
      .put(setUsersLoading(true))
      .provide([[call(deleteUser, user._id)]])
      .put(deleteUserLocally(user._id))
      .put(setUsersLoading(false))
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_DELETE_STATUS))
      .put(setSnackBarStatus(true))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(9);
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(6);
        expect(analysisCall).toHaveLength(3);

        expect(analysisPut[0]).toEqual(
          put({ type: SET_USERS_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: DELETE_USER_LOCALLY, payload: user._id })
        );
        expect(analysisPut[2]).toEqual(
          put({ type: SET_USERS_LOADING, payload: false })
        );
        expect(analysisPut[3]).toEqual(
          put({ type: SET_SNACKBAR_SEVERITY, payload: 'success' })
        );
        expect(analysisPut[4]).toEqual(
          put({ type: SET_SNACKBAR_MESSAGE, payload: SUCCESS_DELETE_STATUS })
        );
        expect(analysisPut[5]).toEqual(
          put({ type: SET_SNACKBAR_STATUS, payload: true })
        );
      })
      .catch((err) => {
        throw err;
      });
  });

  it('should switch user status', () => {
    const user = mockUsersList.items[0];

    return expectSaga(handleUserStatusSwitch, { payload: user._id })
      .put(setUsersLoading(true))
      .provide([[call(switchUserStatus, user._id)]])
      .put(updateUserLocally(user._id))
      .put(setUsersLoading(false))
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_UPDATE_STATUS))
      .put(setSnackBarStatus(true))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(9);
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(6);
        expect(analysisCall).toHaveLength(3);

        expect(analysisPut[0]).toEqual(
          put({ type: SET_USERS_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: UPDATE_USER_LOCALLY, payload: user._id })
        );
        expect(analysisPut[2]).toEqual(
          put({ type: SET_USERS_LOADING, payload: false })
        );
        expect(analysisPut[3]).toEqual(
          put({ type: SET_SNACKBAR_SEVERITY, payload: 'success' })
        );
        expect(analysisPut[4]).toEqual(
          put({ type: SET_SNACKBAR_MESSAGE, payload: SUCCESS_UPDATE_STATUS })
        );
        expect(analysisPut[5]).toEqual(
          put({ type: SET_SNACKBAR_STATUS, payload: true })
        );
      })
      .catch((err) => {
        throw err;
      });
  });

  it('should register admin', () =>
    expectSaga(handleAdminRegister, { payload: adminInput })
      .put(setUsersLoading(true))
      .provide([[call(registerAdmin, adminInput)]])
      .put(setUsersLoading(false))
      .put(push('/users'))
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_CREATION_STATUS))
      .put(setSnackBarStatus(true))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(9);
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(6);
        expect(analysisCall).toHaveLength(3);

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
        expect(analysisPut[3]).toEqual(
          put({ type: SET_SNACKBAR_SEVERITY, payload: 'success' })
        );
        expect(analysisPut[4]).toEqual(
          put({ type: SET_SNACKBAR_MESSAGE, payload: SUCCESS_CREATION_STATUS })
        );
        expect(analysisPut[5]).toEqual(
          put({ type: SET_SNACKBAR_STATUS, payload: true })
        );
      })
      .catch((err) => {
        throw err;
      }));

  it('should confirm admin', () => {
    const admin = { adminInput, token: 'token' };

    return expectSaga(handleAdminConfirm, { payload: admin })
      .put(setUsersLoading(true))
      .provide([[call(completeAdminRegister, admin)]])
      .put(setUsersLoading(false))
      .put(push('/'))
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_CONFIRMATION_STATUS))
      .put(setSnackBarStatus(true))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(9);
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(6);
        expect(analysisCall).toHaveLength(3);

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
        expect(analysisPut[3]).toEqual(
          put({ type: SET_SNACKBAR_SEVERITY, payload: 'success' })
        );
        expect(analysisPut[4]).toEqual(
          put({
            type: SET_SNACKBAR_MESSAGE,
            payload: SUCCESS_CONFIRMATION_STATUS
          })
        );
        expect(analysisPut[5]).toEqual(
          put({ type: SET_SNACKBAR_STATUS, payload: true })
        );
      })
      .catch((err) => {
        throw err;
      });
  });

  it('should valiadte token', () => {
    const token = 'token';

    return expectSaga(handleTokenValidation, { payload: token })
      .put(setUsersLoading(true))
      .provide([[call(validateToken, token)]])
      .put(setUsersLoading(false))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(3);
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
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
      });
  });

  // it('should handle users error', () => {
  //   const e = {
  //     payload: {
  //       message: 'error'
  //     }
  //   }

  //   return expectSaga(handleUsersError, { payload: e })
  //     .put(setUsersLoading(false))
  //     .put(setUserError({ e }))
  //     // .put(setSnackBarSeverity('error'))
  //     // .put(setSnackBarMessage(e.message))
  //     // .put(setSnackBarStatus(true))
  //     .run()
  //     .then((result) => {
  //       const { allEffects: analysis } = result;
  //       // expect(analysis).toHaveLength(5);
  //       const analysisPut = analysis.filter((e) => e.type === 'PUT');
  //       const analysisCall = analysis.filter((e) => e.type === 'CALL');
  //       // expect(analysisPut).toHaveLength(5);
  //       // expect(analysisCall).toHaveLength(0);

  //       // expect(analysisPut[0]).toEqual(
  //       //   put({ type: SET_USERS_LOADING, payload: false })
  //       // );
  //       // expect(analysisPut[1]).toEqual(
  //       //   put({ type: SET_USERS_ERROR, payload: { e } })
  //       // );
  //       // expect(analysisPut[2]).toEqual(
  //       //   put({ type: SET_SNACKBAR_SEVERITY, payload: 'error' })
  //       // );
  //       // expect(analysisPut[3]).toEqual(
  //       //   put({ type: SET_SNACKBAR_MESSAGE, payload: e.message })
  //       // );
  //       // expect(analysisPut[4]).toEqual(
  //       //   put({ type: SET_SNACKBAR_STATUS, payload: true })
  //       // );

  //     }).catch((err) => {
  //       throw err
  //     });
  // })
});
