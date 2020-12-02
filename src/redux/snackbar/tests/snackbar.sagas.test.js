import { expectSaga } from 'redux-saga-test-plan';
import { handleErrorSnackbar, handleSuccessSnackbar } from '../snackbar.sagas';
import { snackBarMessage } from './snackbar.variables';
import snackbarReducer from '../snackbar.reducer';
import {
  setSnackBarMessage,
  setSnackBarStatus,
  setSnackBarSeverity
} from '../snackbar.actions';

describe('Snackbar saga test', () => {
  it('should handle snackbar success', () =>
    expectSaga(handleSuccessSnackbar, snackBarMessage)
      .withReducer(snackbarReducer)
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(snackBarMessage))
      .put(setSnackBarStatus(true))
      .hasFinalState({
        snackBarStatus: true,
        snackBarSeverity: 'success',
        snackBarMessage
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('should handle snackbar success', () =>
    expectSaga(handleErrorSnackbar, snackBarMessage)
      .withReducer(snackbarReducer)
      .put(setSnackBarSeverity('error'))
      .put(setSnackBarMessage(snackBarMessage))
      .put(setSnackBarStatus(true))
      .hasFinalState({
        snackBarStatus: true,
        snackBarSeverity: 'error',
        snackBarMessage
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));
});
