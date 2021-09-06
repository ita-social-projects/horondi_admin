import React from 'react';
import { useUnsavedChangesHandler } from './use-unsaved-changes-handler';

const useStateSpy = jest
  .spyOn(React, 'useState')
  .mockImplementation((value) => [true, () => value]);
const useEffectSpy = jest
  .spyOn(React, 'useEffect')
  .mockImplementation((cb) => cb());
const useRefSpy = jest.spyOn(React, 'useRef').mockImplementation((value) => ({
  current: value
}));
jest.mock('react-redux', () => ({
  useDispatch: () => (cb) => null
}));
jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: () => null, block: (cb) => cb() })
}));
jest.mock('../../utils/use-success-snackbar', () => () => ({
  openSuccessSnackbar: (cb, p1, p2) => cb()
}));

describe('use-unsaved-changes-handler test', () => {
  it('should call other hooks', () => {
    useUnsavedChangesHandler(10);

    expect(useStateSpy).toHaveBeenCalled();

    expect(useEffectSpy).toHaveBeenCalled();

    expect(useRefSpy).toHaveBeenCalled();
  });
});
