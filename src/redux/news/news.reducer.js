import {
  SET_NEWS,
  SHOW_LOADER,
  HIDE_LOADER,
  SET_NEWS_ITEM
} from './news.types';

import { config } from '../../configs';

const { languages } = config;

const initialState = {
  list: [],
  newsItem: {
    author: {
      name: [
        {
          lang: languages[0],
          value: 'default'
        },
        {
          lang: languages[1],
          value: 'default'
        }
      ],
      image: {
        small: 'default'
      }
    },
    text: [
      {
        lang: languages[0],
        value: 'default'
      },
      {
        lang: languages[1],
        value: 'default'
      }
    ],
    title: [
      {
        lang: languages[0],
        value: 'default'
      },
      {
        lang: languages[1],
        value: 'default'
      }
    ],
    video: 'default',
    date: 'default',
    images: {
      primary: {
        medium: 'default'
      }
    }
  },
  loading: false
};

const newsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_NEWS:
    return {
      ...state,
      list: action.payload
    };
  case SET_NEWS_ITEM:
    return {
      ...state,
      newsItem: action.payload
    };
  case SHOW_LOADER:
    return {
      ...state,
      loading: true
    };
  case HIDE_LOADER:
    return {
      ...state,
      loading: false
    };
  default:
    return state;
  }
};

export default newsReducer;
