import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../../snackbar/snackbar.actions';
import {
  snackBarMessage,
  snackBarSeverity,
  snackBarStatus
} from './snackbar.variables';
import snackbarState, { initialState } from '../../snackbar/snackbar.reducer';

describe('snackbar reducer tests', () => {
  it('should return default state', () => {
    expect(snackbarState(initialState)).toEqual(initialState);
  });
  it('should set snackbar message to store', () => {
    expect(
      snackbarState(initialState, setSnackBarMessage(snackBarMessage))
    ).toEqual({
      ...initialState,
      snackBarMessage
    });
  });
  it('should set snackbar severity to store', () => {
    expect(
      snackbarState(initialState, setSnackBarSeverity(snackBarSeverity))
    ).toEqual({
      ...initialState,
      snackBarSeverity
    });
  });
  it('should set snackbar status to store', () => {
    expect(
      snackbarState(initialState, setSnackBarStatus(snackBarStatus))
    ).toEqual({
      ...initialState,
      snackBarStatus
    });
  });
});
