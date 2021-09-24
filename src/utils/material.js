import _ from 'lodash';

import { materialMessages } from '../configs/material-messages';

export const purposeFilterObj = () => {
  const arrToFilter = [];

  _.forEach(materialMessages.purpose, (value, key) => {
    arrToFilter.push({ value: key, label: value });
  });

  return arrToFilter;
};

export const placeholderMaterialText = 'за назвою';
