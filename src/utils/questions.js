import _ from 'lodash';

export const showQuestionOptions = {
  all: 'Всі',
  pending: 'Очікує відповіді',
  spam: 'Спам',
  answered: 'Відповідь надано'
};
export const placeholderQuestionSearch = 'по тексту';
export const showFilterObj = () => {
  const arrToFilter = [];

  _.forEach(showQuestionOptions, (value, key) => {
    arrToFilter.push({ key, value });
  });

  return arrToFilter;
};
