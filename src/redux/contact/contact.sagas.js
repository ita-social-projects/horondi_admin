import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { setItemsCount, updatePagination } from '../table/table.actions';

import {
  getContacts,
  deleteContact,
  getContactById,
  addContact,
  updateContact
} from './contact.operations';

import {
  setContacts,
  setContactsLoading,
  setContact,
  setContactsError,
  addContactInStore,
  deleteContactInStore,
  updateContactInStore
} from './contact.actions';

import {
  GET_CONTACTS,
  DELETE_CONTACT,
  ADD_CONTACT,
  UPDATE_CONTACT,
  GET_CONTACT
} from './contact.types';

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

export function* handleContactsLoad({ payload: { skip, limit } }) {
  try {
    yield put(setContactsLoading(true));
    const contacts = yield call(getContacts, skip, limit);
    yield put(setItemsCount(contacts.count));
    yield put(setContacts(contacts.items));
    yield put(setContactsLoading(false));
  } catch (error) {
    yield call(handleContactsError, error);
  }
}

export function* handleContactLoad({ payload }) {
  try {
    yield put(setContactsLoading(true));
    const contact = yield call(getContactById, payload);
    yield put(setContact(contact));
    yield put(setContactsLoading(false));
  } catch (error) {
    yield call(handleContactsError, error);
  }
}

export function* handleAddContact({ payload }) {
  try {
    yield put(setContactsLoading(true));
    yield call(addContact, payload.newContact, payload.mapImages);
    yield put(addContactInStore(payload.newContact));
    yield put(setContactsLoading(false));

    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
    yield put(push('/contacts'));
  } catch (error) {
    yield call(handleContactsError, error);
  }
}

export function* handleContactDelete({ payload }) {
  try {
    yield put(setContactsLoading(true));
    yield call(deleteContact, payload);
    yield put(deleteContactInStore(payload));
    yield put(updatePagination());
    yield put(setContactsLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleContactsError, error);
  }
}

export function* handleContactUpdate({ payload }) {
  const { id, updatedContact, mapImages } = payload;

  try {
    yield put(setContactsLoading(true));
    yield call(updateContact, id, updatedContact, mapImages);

    yield put(updateContactInStore(id, updatedContact));

    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
    yield put(push('/contacts'));
  } catch (error) {
    yield call(handleContactsError, error);
  }
}

export function* handleContactsError(e) {
  yield put(setContactsLoading(false));
  yield put(setContactsError({ e }));
  yield call(handleErrorSnackbar, e.message);
}

export default function* contactsSaga() {
  yield takeEvery(GET_CONTACTS, handleContactsLoad);
  yield takeEvery(GET_CONTACT, handleContactLoad);
  yield takeEvery(ADD_CONTACT, handleAddContact);
  yield takeEvery(UPDATE_CONTACT, handleContactUpdate);
  yield takeEvery(DELETE_CONTACT, handleContactDelete);
}
