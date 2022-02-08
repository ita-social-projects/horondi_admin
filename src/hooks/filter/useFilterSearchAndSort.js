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

export const useFilter = (options, handler) => {
  const setOptionHandler = useCallback(
    (e) => {
      const { value: _value } = e.target;
      if (_value) {
        handler(_value);
      }
    },
    [options]
  );

  const renderValue = (selectedValues) =>
    options.reduce((acumulator, option) => {
      let selectedItem;

      selectedValues.forEach((selectedValue, _index, array) => {
        if (selectedValue === option.value) {
          if (array.length > 1) {
            selectedItem = `${option.label}, `;
          } else {
            selectedItem = option.label;
          }
        }
      });
      acumulator.push(selectedItem);
      return acumulator;
    }, []);
  return {
    optionHandler: setOptionHandler,
    setRenderValue: renderValue
  };
};

// //
