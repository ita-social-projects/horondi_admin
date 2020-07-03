import { takeEvery, call, put } from 'redux-saga/effects';
import { setNews } from './news.actions';
import { getItems } from '../../utils/client';
import { GET_NEWS } from './news.types';
import { hideLoader } from '../app/app.actions';

function* handleNewsLoad() {
  try {
    const news = yield call(
      getItems,
      `query{
         getAllNews{
           title {
             value
           }
           author{
             name{
             value
             }
                }
               }
             }`
    );
    yield put(setNews(news.data.getAllNews));
    yield put(hideLoader());
  } catch (error) {
    console.log(error);
  }
}

export default function* newsSaga() {
  yield takeEvery(GET_NEWS, handleNewsLoad);
}
