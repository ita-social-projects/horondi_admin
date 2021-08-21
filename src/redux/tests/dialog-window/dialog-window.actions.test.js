import {
  closeDialog,
  showDialog
} from '../../dialog-window/dialog-window.actions';
import {
  SHOW_DIALOG,
  CLOSE_DIALOG
} from '../../dialog-window/dialog-window.types';

describe('test dialog window actions', () => {
  it('should return true and action type', () => {
    expect(showDialog(true)).toEqual({ type: SHOW_DIALOG, payload: true });
  });
  it('should return false and action type', () => {
    expect(showDialog(false)).toEqual({ type: SHOW_DIALOG, payload: false });
  });
  it('should return true and action type', () => {
    expect(closeDialog()).toEqual({ type: CLOSE_DIALOG });
  });
  it('should return false and action type', () => {
    expect(closeDialog()).toEqual({ type: CLOSE_DIALOG });
  });
});
