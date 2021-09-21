import React from 'react';
import useChangedValuesChecker from './use-changed-values-checker';

const useEffectSpy = jest
  .spyOn(React, 'useEffect')
  .mockImplementation((cb) => cb());
const useRefSpy = jest.spyOn(React, 'useRef').mockImplementation(() => ({
  current: {
    additionalPrice: 10
  }
}));

describe('use-changed-values-checker test', () => {
  it('should call other hooks', () => {
    useChangedValuesChecker(
      {
        additionalPrice: 12
      },
      {}
    );

    expect(useEffectSpy).toHaveBeenCalled();
    expect(useRefSpy).toHaveBeenCalled();
  });
});
