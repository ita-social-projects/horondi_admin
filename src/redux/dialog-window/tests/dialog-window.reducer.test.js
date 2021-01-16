import dialogWindowReducer, { initialState } from '../dialog-window.reducer';
import { closeDialog, showDialog } from '../dialog-window.actions';

describe('dialog window reducer tests', () => {
  it('should return default state', () => {
    expect(dialogWindowReducer(initialState)).toEqual(initialState);
  });
  it('should set isOpen to true', () => {
    expect(
      dialogWindowReducer(initialState, showDialog({ isOpen: true }))
    ).toEqual({
      ...initialState,
      isOpen: true
    });
  });
  it('should set isOpen to false', () => {
    expect(dialogWindowReducer(initialState, closeDialog())).toEqual({
      ...initialState,
      isOpen: false
    });
  });
  it('should be defined', () => {
    expect(initialState.dialogTitle).toBeDefined();
    expect(initialState.dialogContent).toBeDefined();
    expect(initialState.onClickHandler).toBeDefined();
    expect(initialState.onClickHandler).not.toBeNull();
    expect(initialState.onClickHandler).not.toThrow();
  });
});
