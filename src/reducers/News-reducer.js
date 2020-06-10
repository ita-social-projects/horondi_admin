const initialState = {
  news: {
    author: '',
    authorPhoto: '',
    newsImage: '',
    newsVideo: 'no video',
    title: '',
    text: ''
  },
  newsItem: {
    author: '',
    authorPhoto: '',
    newsImage: '',
    newsVideo: 'no video',
    title: '',
    text: ''
  },
  loading: true
};

const newsState = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_STATUS':
      return {
        ...state,
        loading: true
      };

    case 'SET_NEWS':
      return {
        ...state,
        news: action.payload,
        loading: false
      };

    case 'SET_NEWS_ITEM':
      return {
        ...state,
        newsItem: action.payload,
        loading: false
      };

    default:
      return state;
  }
};

export default newsState;
