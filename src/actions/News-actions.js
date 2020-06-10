const setNews = (newNews) => ({
  type: 'SET_NEWS',
  payload: newNews
});

const setNewsItem = (newNewsItem) => ({
  type: 'SET_NEWS_ITEM',
  payload: newNewsItem
});

const newsLoadingStatus = () => ({
  type: 'LOADING_STATUS'
});

export { setNews, setNewsItem, newsLoadingStatus };
