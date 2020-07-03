import { ADD_NEWS_ITEM } from './news-add.types';

const addNewsItem = (payload) => ({
  type: ADD_NEWS_ITEM,
  payload
});

export { addNewsItem };
