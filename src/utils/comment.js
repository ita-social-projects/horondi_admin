import _ from 'lodash';

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
