import { push } from 'connected-react-router';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  addConstructorBasicToStore,
  addConstructorBottomToStore,
  addConstructorPatternToStore,
  addConstructorPocketToStore,
  editConstructorBasicInStore,
  editConstructorBottomInStore,
  editConstructorPocketInStore,
  removeConstructorBasicFromStore,
  removeConstructorBottomFromStore,
  removeConstructorPatternFromStore,
  removeConstructorPocketFromStore,
  setModelLoading
} from '../model/model.actions';
import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';
import { handleModelError } from '../model/model.sagas';
import {
  createConstructor,
  createConstructorBasic,
  createConstructorBottom,
  createConstructorFrontPocket,
  deleteConstructorBasic,
  deleteConstructorBottom,
  deleteConstructorFrontPocket,
  getAllConstructors,
  getConstructorById,
  updateConstructorBasic,
  updateConstructorBottom,
  updateConstructorFrontPocket,
  deleteConstructor,
  updateConstructorById
} from './constructor.operations';
import { config } from '../../configs';
import {
  addModelConstructorBasic,
  addModelConstructorBottom,
  addModelConstructorFrontPocket,
  addModelConstructorPattern,
  deleteModelConstructorBasic,
  deleteModelConstructorBottom,
  deleteModelConstructorFrontPocket,
  deleteModelConstructorPattern
} from '../model/model.operations';
import {
  ADD_CONSTRUCTOR_BASIC,
  ADD_CONSTRUCTOR_BOTTOM,
  ADD_CONSTRUCTOR_FRONT_POCKET,
  ADD_CONSTRUCTOR_PATTERN,
  DELETE_CONSTRUCTOR_BASIC,
  DELETE_CONSTRUCTOR_BOTTOM,
  DELETE_CONSTRUCTOR_FRONT_POCKET,
  DELETE_CONSTRUCTOR_PATTERN,
  UPDATE_CONSTRUCTOR_BASIC,
  UPDATE_CONSTRUCTOR_BOTTOM,
  UPDATE_CONSTRUCTOR_FRONT_POCKET,
  ADD_CONSTRUCTOR,
  GET_CONSTRUCTORS,
  GET_CONSTRUCTOR,
  DELETE_CONSTRUCTOR,
  UPDATE_CONSTRUCTOR
} from './constructor.types';
import {
  removeConstructorFromStore,
  setConstructorError,
  setConstructorLoading,
  setConstructors,
  setConstructor
} from './constructor.actions';
import { setItemsCount, updatePagination } from '../table/table.actions';
import { handleAdminLogout } from '../auth/auth.sagas';
import { AUTH_ERRORS } from '../../error-messages/auth';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } =
  config.statuses;

export function* handleConstructorAdd({ payload }) {
  try {
    yield put(setConstructorLoading(true));
    yield call(createConstructor, payload);
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
    yield put(push(config.routes.pathToConstructorList));
    yield put(setConstructorLoading(false));
  } catch (error) {
    yield call(handleConstructorError, error);
  }
}

export function* handleConstructorUpdate({ payload }) {
  try {
    yield put(setConstructorLoading(true));
    yield call(updateConstructorById, {
      id: payload.id,
      constructor: payload.constructor
    });
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
    yield put(push(config.routes.pathToConstructorList));
    yield put(setConstructorLoading(false));
  } catch (error) {
    yield call(handleConstructorError, error);
  }
}

export function* handleConstructorsLoad({ payload: { limit, skip, filter } }) {
  try {
    yield put(setConstructorLoading(true));
    const constructors = yield call(getAllConstructors, {
      limit,
      skip,
      filter
    });
    yield put(setItemsCount(constructors?.count));
    yield put(setConstructors(constructors?.items));
    yield put(setConstructorLoading(false));
  } catch (error) {
    yield call(handleConstructorError, error);
  }
}

export function* handleConstructorLoad({ payload }) {
  try {
    yield put(setConstructorLoading(true));
    const constructor = yield call(getConstructorById, payload);
    yield put(setConstructor(constructor));
    yield put(setConstructorLoading(false));
  } catch (error) {
    yield call(handleConstructorError, error);
  }
}

export function* handleConstructorDelete({ payload }) {
  try {
    yield put(setConstructorLoading(true));
    yield call(deleteConstructor, payload);
    yield put(removeConstructorFromStore(payload));
    yield put(updatePagination());
    yield put(setConstructorLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleConstructorError, error);
  }
}

export function* handleConstructorBasicDelete({ payload }) {
  try {
    yield put(setModelLoading(true));
    const constructorBasic = yield call(deleteConstructorBasic, payload);
    yield call(deleteModelConstructorBasic, {
      id: payload.id,
      constructorElementID: constructorBasic._id
    });
    yield put(removeConstructorBasicFromStore(constructorBasic._id));
    yield put(setModelLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleModelError, error);
  }
}

export function* handleConstructorBasicCreate({ payload }) {
  try {
    const constructorBasic = yield call(createConstructorBasic, payload);
    yield call(addModelConstructorBasic, {
      id: payload.id,
      constructorElementID: constructorBasic._id
    });
    yield put(addConstructorBasicToStore({ id: payload.id, constructorBasic }));
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
  } catch (error) {
    yield call(handleModelError, error);
  }
}

export function* handleConstructorBasicUpdate({ payload }) {
  try {
    yield put(setModelLoading(true));
    const constructorBasic = yield call(updateConstructorBasic, payload);
    yield put(setModelLoading(false));
    yield put(editConstructorBasicInStore({ constructorBasic }));
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
  } catch (error) {
    yield call(handleModelError, error);
  }
}

export function* handleConstructorBottomCreate({ payload }) {
  try {
    const constructorBottom = yield call(createConstructorBottom, payload);
    yield call(addModelConstructorBottom, {
      id: payload.id,
      constructorElementID: constructorBottom._id
    });
    yield put(
      addConstructorBottomToStore({ id: payload.id, constructorBottom })
    );
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
  } catch (error) {
    yield call(handleModelError, error);
  }
}

export function* handleConstructorBottomDelete({ payload }) {
  try {
    yield put(setModelLoading(true));
    const constructorBottom = yield call(deleteConstructorBottom, payload);
    yield call(deleteModelConstructorBottom, {
      id: payload.id,
      constructorElementID: constructorBottom._id
    });
    yield put(removeConstructorBottomFromStore(constructorBottom._id));
    yield put(setModelLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleModelError, error);
  }
}

export function* handleConstructorBottomUpdate({ payload }) {
  try {
    yield put(setModelLoading(true));
    const constructorBottom = yield call(updateConstructorBottom, payload);
    yield put(setModelLoading(false));
    yield put(editConstructorBottomInStore({ constructorBottom }));
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
  } catch (error) {
    yield call(handleModelError, error);
  }
}

export function* handleConstructorFrontPocketCreate({ payload }) {
  try {
    const constructorFrontPocket = yield call(
      createConstructorFrontPocket,
      payload
    );
    yield call(addModelConstructorFrontPocket, {
      id: payload.id,
      constructorElementID: constructorFrontPocket._id
    });
    yield put(
      addConstructorPocketToStore({ id: payload.id, constructorFrontPocket })
    );
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
  } catch (error) {
    yield call(handleModelError, error);
  }
}

export function* handleConstructorFrontPocketDelete({ payload }) {
  try {
    yield put(setModelLoading(true));
    const constructorFrontPocket = yield call(
      deleteConstructorFrontPocket,
      payload
    );
    yield call(deleteModelConstructorFrontPocket, {
      id: payload.id,
      constructorElementID: constructorFrontPocket._id
    });
    yield put(removeConstructorPocketFromStore(constructorFrontPocket._id));
    yield put(setModelLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleModelError, error);
  }
}

export function* handleConstructorFrontPocketUpdate({ payload }) {
  try {
    yield put(setModelLoading(true));
    const constructorFrontPocket = yield call(
      updateConstructorFrontPocket,
      payload
    );
    yield put(setModelLoading(false));
    yield put(editConstructorPocketInStore({ constructorFrontPocket }));
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
  } catch (error) {
    yield call(handleModelError, error);
  }
}

export function* handleConstructorPatternAdd({ payload }) {
  try {
    yield call(addModelConstructorPattern, {
      id: payload.id,
      constructorElementID: payload.pattern._id
    });
    yield put(
      addConstructorPatternToStore({
        id: payload.id,
        constructorPattern: payload.pattern
      })
    );
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
  } catch (error) {
    yield call(handleModelError, error);
  }
}

export function* handleConstructorPatternDelete({ payload }) {
  try {
    yield put(setModelLoading(true));
    yield call(deleteModelConstructorPattern, {
      id: payload.id,
      constructorElementID: payload.constructorElementID
    });
    yield put(removeConstructorPatternFromStore(payload.constructorElementID));
    yield put(setModelLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleModelError, error);
  }
}

export function* handleConstructorError(e) {
  if (e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID) {
    yield call(handleAdminLogout);
  } else {
    yield put(setConstructorLoading(false));
    yield put(setConstructorError({ e }));
    yield call(handleErrorSnackbar, e.message);
  }
}

export default function* constructorSaga() {
  yield takeEvery(DELETE_CONSTRUCTOR_BASIC, handleConstructorBasicDelete);
  yield takeEvery(ADD_CONSTRUCTOR_BASIC, handleConstructorBasicCreate);
  yield takeEvery(UPDATE_CONSTRUCTOR_BASIC, handleConstructorBasicUpdate);
  yield takeEvery(ADD_CONSTRUCTOR_BOTTOM, handleConstructorBottomCreate);
  yield takeEvery(DELETE_CONSTRUCTOR_BOTTOM, handleConstructorBottomDelete);
  yield takeEvery(UPDATE_CONSTRUCTOR_BOTTOM, handleConstructorBottomUpdate);
  yield takeEvery(DELETE_CONSTRUCTOR, handleConstructorDelete);
  yield takeEvery(UPDATE_CONSTRUCTOR_BOTTOM, handleConstructorBottomUpdate);
  yield takeEvery(GET_CONSTRUCTORS, handleConstructorsLoad);
  yield takeEvery(GET_CONSTRUCTOR, handleConstructorLoad);
  yield takeEvery(ADD_CONSTRUCTOR, handleConstructorAdd);
  yield takeEvery(UPDATE_CONSTRUCTOR, handleConstructorUpdate);
  yield takeEvery(
    ADD_CONSTRUCTOR_FRONT_POCKET,
    handleConstructorFrontPocketCreate
  );
  yield takeEvery(
    DELETE_CONSTRUCTOR_FRONT_POCKET,
    handleConstructorFrontPocketDelete
  );
  yield takeEvery(
    UPDATE_CONSTRUCTOR_FRONT_POCKET,
    handleConstructorFrontPocketUpdate
  );
  yield takeEvery(ADD_CONSTRUCTOR_PATTERN, handleConstructorPatternAdd);
  yield takeEvery(DELETE_CONSTRUCTOR_PATTERN, handleConstructorPatternDelete);
}
