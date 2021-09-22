import _ from 'lodash';

import { materialTranslations } from '../configs/error-modal-messages';

export const purposeFilterObj = () => {
  const arrToFilter = [];

  _.forEach(materialTranslations.purpose, (value, key) => {
    arrToFilter.push({ key, value });
  });

  return arrToFilter;
};

export const placeholderMaterialText = 'за назвою';
