import { useCallback } from 'react';

export const useSort = (options, handler) => {
  const setOptionHandler = useCallback(
    (e) => {
      const result = options.find((item) => item.value === e.target.value);

      if (result) {
        handler(result);
      }
    },
    [options]
  );
  return { optionHandler: setOptionHandler };
};
