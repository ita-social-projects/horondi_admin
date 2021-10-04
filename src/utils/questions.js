import _ from 'lodash';
import { config } from '../configs';

const { labels } = config;

export const showQuestionOptions = {
  PENDING: labels.emailQuestionsLabels.ua.PENDING,
  SPAM: labels.emailQuestionsLabels.ua.SPAM,
  ANSWERED: labels.emailQuestionsLabels.ua.ANSWERED
};
export const placeholderQuestionSearch = 'по тексту';
export const showFilterObj = () => {
  const arrToFilter = [];

  _.forEach(showQuestionOptions, (value, key) => {
    arrToFilter.push({ value: key, label: value });
  });

  return arrToFilter;
};
