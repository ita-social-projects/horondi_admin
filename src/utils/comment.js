import _ from 'lodash';
import moment from 'moment';

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

export const getTime = (date) =>
  moment.unix(new Date(date) / 1000).format('DD.MM.YYYY ');
