import _ from 'lodash';
import { statusPatterns } from '../consts/pattern-status';

export const statusPatternFilterObject = statusPatterns.map(
  ({ value, label }) => ({
    value,
    label
  })
);

export const materialOptions = {};

export const convertToCatOptions = (items) => {
  if (items) {
    items.map((item) =>
      Object.assign(materialOptions, {
        [item.features.material._id]: item.features.material.name[0].value
      })
    );
    return materialOptions;
  }
};

export const materialFilterObj = () => {
  const arrToFilter = [];
  _.forEach(materialOptions, (value, key) => {
    arrToFilter.push({ value: key, label: value });
  });
  return arrToFilter;
};
