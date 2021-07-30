import _ from 'lodash';
import moment from 'moment';

import { config } from '../configs';

export const showCommentOptions = {
  true: 'Видимі',
  false: 'Приховані'
};

export const placeholderCommentSearch = 'по тексту';

export const showFilterObj = () => {
  const arrToFilter = [];

  _.forEach(showCommentOptions, (value, key) => {
    arrToFilter.push({ key, value });
  });

  return arrToFilter;
};

export const showCommentTypes = () => config.labels.comments.select.map(({ value, label }) => ({
    key: value,
    value: label
  }));

export const getTime = (date) =>
  moment.unix(new Date(date) / 1000).format('DD.MM.YYYY ');
