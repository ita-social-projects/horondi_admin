import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
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
  setContactsCurrentPage,
  setContactsPagesCount,
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

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../snackbar/snackbar.actions';

import { config } from '../../configs';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

const {
  skip,
  limit,
  contactsPerPage
} = config.pagination.contactsPaginationPayload;

function* handleContactsLoad({
  payload = {
    skip: 1,
    limit: 1,
    contactsPerPage: 1
  }
}) {
  try {
    yield put(setContactsLoading(true));
    const contacts = yield call(getContacts, payload.skip, payload.limit);
    yield put(
      setContactsPagesCount(Math.ceil(contacts.count / payload.contactsPerPage))
    );
    yield put(setContacts(contacts.items));
    yield put(setContactsLoading(false));
  } catch (error) {
    yield call(handleContactsError, error);
  }
}

function* handleContactLoad({ payload }) {
  try {
    yield put(setContactsLoading(true));
    const contact = yield call(getContactById, payload);
    yield put(setContact(contact));
    yield put(setContactsLoading(false));
  } catch (error) {
    yield call(handleContactsError, error);
  }
}

function* handleAddContact({ payload }) {
  try {
    yield put(setContactsLoading(true));
    yield call(addContact, payload.newContact, payload.mapImages);
    yield put(addContactInStore(payload.newContact));
    yield put(setContactsLoading(false));

    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_ADD_STATUS));
    yield put(setSnackBarStatus(true));
    yield put(push('/contacts'));
  } catch (error) {
    yield call(handleContactsError, error);
  }
}

function* handleContactDelete({ payload }) {
  try {
    yield put(setContactsLoading(true));

    yield call(deleteContact, payload);
    yield put(deleteContactInStore(payload));

    const contacts = yield call(getContacts, skip, limit);
    yield put(
      setContactsPagesCount(Math.ceil(contacts.count / contactsPerPage))
    );
    yield put(setContactsCurrentPage(1));
    yield put(setContacts(contacts.items));

    yield put(setContactsLoading(false));

    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_DELETE_STATUS));
    yield put(setSnackBarStatus(true));
  } catch (error) {
    yield call(handleContactsError, error);
  }
}

function* handleContactUpdate({ payload }) {
  const { id, updatedContact, mapImages } = payload;

  try {
    yield put(setContactsLoading(true));
    yield call(updateContact, id, updatedContact, mapImages);

    yield put(updateContactInStore(id, updatedContact));

    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_UPDATE_STATUS));
    yield put(setSnackBarStatus(true));
    yield put(push('/contacts'));
  } catch (error) {
    yield call(handleContactsError, error);
  }
}

function* handleContactsError(e) {
  yield put(setContactsLoading(false));
  yield put(setContactsError({ e }));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e.message));
  yield put(setSnackBarStatus(true));
}

export default function* contactsSaga() {
  yield takeEvery(GET_CONTACTS, handleContactsLoad);
  yield takeEvery(GET_CONTACT, handleContactLoad);
  yield takeEvery(ADD_CONTACT, handleAddContact);
  yield takeEvery(UPDATE_CONTACT, handleContactUpdate);
  yield takeEvery(DELETE_CONTACT, handleContactDelete);
}
