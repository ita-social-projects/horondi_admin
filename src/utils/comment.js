import _ from 'lodash';
import moment from 'moment';
import comments from '../configs/comments';

export const showCommentOptions = {
  true: 'Видимі',
  false: 'Приховані'
};


export const commentsOptions = Object.entries(comments.commentType).map(
  ([key, value]) => ({
    value: key,
    label: value
  })

export const commentFilterObj = Object.entries(comments.commentType).map(
  ([key, value]) => ({ value: key, label: value })
);

export const placeholderCommentSearch = 'по тексту';

export const showFilterObj = () => {
  const arrToFilter = [];

  _.forEach(showCommentOptions, (value, key) => {
    arrToFilter.push({ value: key, label: value });
  });

  return arrToFilter;
};

export const getTime = (date) =>
  moment.unix(new Date(date) / 1000).format('DD.MM.YYYY ');
