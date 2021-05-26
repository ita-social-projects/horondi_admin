import _ from 'lodash';

export const answerTextHandler = (answer) =>
  answer && answer.text ? `<br> <b>A:</b> ${answer.text}` : '';

export const showEmailQuestionStatusOptions = {
  ALL: 'Всі',
  PENDING: 'Очікує відповіді',
  SPAM: 'Спам',
  ANSWERED: 'Відповідь надано'
};
export const placeholderEmailQuestionSearch = 'по запитанні';
export const showFilterObj = () => {
  const arrToFilter = [];

  _.forEach(showEmailQuestionStatusOptions, (value, key) => {
    arrToFilter.push({ key, value });
  });

  return arrToFilter;
};
