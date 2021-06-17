import _ from 'lodash';

export const showQuestionOptions = {
  PENDING: 'Очікує відповіді',
  SPAM: 'Спам',
  ANSWERED: 'Відповідь надано'
};
export const placeholderQuestionSearch = 'по тексту';
export const showFilterObj = () => {
  const arrToFilter = [];

  _.forEach(showQuestionOptions, (value, key) => {
    arrToFilter.push({ key, value });
  });

  return arrToFilter;
};
