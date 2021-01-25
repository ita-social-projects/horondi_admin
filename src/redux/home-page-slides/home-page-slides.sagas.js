import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { setItemsCount, updatePagination } from '../table/table.actions';
import {
  removeSlideFromStore,
  setAvailableSlides,
  setSlide,
  setSlideError,
  setSlideLoading,
  setSlides,
  setSlidesDrugAndDropList
} from './home-page-slides.actions';
import {
  createSlide,
  deleteSlide,
  getAllAvailableSlides,
  getAllSlides,
  getSlideById,
  updateSlide
} from './home-page-slides.operations';

import {
  ADD_SLIDE,
  DELETE_SLIDE,
  GET_AVAILABLE_SLIDES,
  GET_SLIDE,
  GET_SLIDES,
  UPDATE_SLIDE,
  UPDATE_SLIDES_ORDER
} from './home-page-slides.types';
import { config } from '../../configs';
import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

export function* handleSlidesLoad({ payload }) {
  try {
    yield put(setSlideLoading(true));
    const slides = yield call(getAllSlides, payload.skip, payload.limit);
    yield put(setItemsCount(slides.count));
    yield put(setSlides(slides.items));
    yield put(setSlideLoading(false));
  } catch (error) {
    yield call(handleSlideError, error);
  }
}

export function* handleAvailableSlides() {
  try {
    yield put(setSlideLoading(true));
    const availableSlides = yield call(getAllAvailableSlides);
    yield put(setAvailableSlides(availableSlides.items));
    yield put(
      setSlidesDrugAndDropList([
        {
          title: 'available',
          items: availableSlides.items.filter((el) => el.show)
        },
        {
          title: 'nonAvailable',
          items: availableSlides.items.filter((el) => !el.show)
        }
      ])
    );
    yield put(setSlideLoading(false));
  } catch (error) {
    yield call(handleSlideError, error);
  }
}

export function* handleSlideLoad({ payload }) {
  try {
    yield put(setSlideLoading(true));
    const slide = yield call(getSlideById, payload);
    yield put(setSlide(slide));
    yield put(setSlideLoading(false));
  } catch (error) {
    yield call(handleSlideError, error);
  }
}

export function* handleAddSlide({ payload }) {
  try {
    yield put(setSlideLoading(true));
    yield call(createSlide, payload);
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
    yield put(push(config.routes.pathToHomePageSlides));
  } catch (error) {
    yield call(handleSlideError, error);
  }
}

export function* handleSlideUpdate({ payload }) {
  try {
    yield put(setSlideLoading(true));
    yield call(updateSlide, payload);
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
    yield put(push(config.routes.pathToHomePageSlides));
  } catch (error) {
    yield call(handleSlideError, error);
  }
}
export function* handleUpdateSlideOrder({ payload }) {
  try {
    yield call(updateSlide, payload);
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
  } catch (error) {
    yield call(handleSlideError, error);
  }
}

export function* handleSlideDelete({ payload }) {
  try {
    yield put(setSlideLoading(true));
    yield call(deleteSlide, payload);
    yield put(removeSlideFromStore(payload));
    yield put(updatePagination());
    yield put(setSlideLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleSlideError, error);
  }
}

export function* handleSlideError(e) {
  yield put(setSlideLoading(false));
  yield put(setSlideError({ e }));
  yield call(handleErrorSnackbar, e.message);
}

export default function* slideSaga() {
  yield takeEvery(GET_SLIDES, handleSlidesLoad);
  yield takeEvery(GET_AVAILABLE_SLIDES, handleAvailableSlides);
  yield takeEvery(ADD_SLIDE, handleAddSlide);
  yield takeEvery(UPDATE_SLIDE, handleSlideUpdate);
  yield takeEvery(GET_SLIDE, handleSlideLoad);
  yield takeEvery(DELETE_SLIDE, handleSlideDelete);
  yield takeEvery(UPDATE_SLIDES_ORDER, handleUpdateSlideOrder);
}
