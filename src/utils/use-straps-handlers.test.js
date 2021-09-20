import React from 'react';
import useStrapsHandlers from './use-straps-handlers';

const useStateSpy = jest
  .spyOn(React, 'useState')
  .mockImplementation(() => [null, null]);
describe('use-straps-handlers test', () => {
  it('should call useStateSpy', () => {
    const result = useStrapsHandlers();

    expect(useStateSpy).toHaveBeenCalled();
    expect(result).toHaveProperty('createStraps');
  });
});
