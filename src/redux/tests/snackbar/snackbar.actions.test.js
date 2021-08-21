import {
  SET_SNACKBAR_MESSAGE,
  SET_SNACKBAR_SEVERITY,
  SET_SNACKBAR_STATUS
} from '../../snackbar/snackbar.types';
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

describe('snackbar tests', () => {
  it('should return snackbar message', () => {
    expect(setSnackBarMessage(snackBarMessage)).toEqual({
      type: SET_SNACKBAR_MESSAGE,
      payload: snackBarMessage
    });
  });
  it('should return snackbar severity', () => {
    expect(setSnackBarSeverity(snackBarSeverity)).toEqual({
      type: SET_SNACKBAR_SEVERITY,
      payload: snackBarSeverity
    });
  });
  it('should return snackbar severity', () => {
    expect(setSnackBarStatus(snackBarStatus)).toEqual({
      type: SET_SNACKBAR_STATUS,
      payload: snackBarStatus
    });
  });
});
