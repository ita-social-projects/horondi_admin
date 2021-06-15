import _ from 'lodash';

export const showQuestions = {
  all: 'Видимі',
  pending: 'Очікує відповіді',
  spam: 'Спам',
  answered: 'Відповідь надано'
};
export const placeholderCommentSearch = 'по тексту';
export const showFilterObj = () => {
  const arrToFilter = [];

  _.forEach(showQuestions, (value, key) => {
    arrToFilter.push({ key, value });
  });

  return arrToFilter;
};
