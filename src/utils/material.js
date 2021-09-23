import _ from 'lodash';

import { materialTranslations } from '../translations/material.translations';

export const purposeFilterObj = () => {
  const arrToFilter = [];

  _.forEach(materialTranslations.purpose, (value, key) => {
    arrToFilter.push({ value: key, label: value });
  });

  return arrToFilter;
};

export const placeholderMaterialText = 'за назвою';
