import { useCallback, useState, useEffect } from 'react';

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

  const filterInputToRender = (selectedValues, valueToRender) =>
    selectedValues.map((selectedValue, inx, values) => {
      let selectedRenderValue;
      if (inx !== values.length - 1) {
        selectedRenderValue = `${valueToRender[selectedValue]}, `;
      } else {
        selectedRenderValue = valueToRender[selectedValue];
      }
      return selectedRenderValue;
    });
  return {
    optionHandler: setOptionHandler,
    setRenderValue: filterInputToRender
  };
};

export const useFilterByData = (dateFrom, dateTo, handler) => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    if (dateFrom && dateTo) {
      setValue([dateFrom, dateTo]);
    }
  }, [dateFrom, dateTo]);

  const setDateHandler = (e) => {
    handler(e);
  };
  return {
    dataHandler: setDateHandler,
    value
  };
};
