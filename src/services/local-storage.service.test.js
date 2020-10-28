import { setToLocalStorage } from './local-storage.service';

describe('localstorage service tests', () => {
  it('should exist', () => {
    expect(setToLocalStorage).toBeDefined();
    expect(setToLocalStorage).not.toBeNull();
    expect(setToLocalStorage).not.toThrow();
  });
});
