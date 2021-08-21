import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { combineReducers } from 'redux';

import {
  handleContactsLoad,
  handleContactLoad,
  handleAddContact,
  handleContactDelete,
  handleContactUpdate,
  handleContactsError
} from '../../contact/contact.sagas';
import {
  setContacts,
  setContactsLoading,
  setContact,
  setContactsError,
  deleteContactInStore,
  addContactInStore,
  updateContactInStore
} from '../../contact/contact.actions';

import {
  contact,
  payload,
  contactRes,
  newContact,
  updatedContact,
  error,
  initialState,
  mockTableState
} from './contact.variables';

import { setItemsCount, updatePagination } from '../../table/table.actions';

import {
  getContacts,
  deleteContact,
  getContactById,
  addContact,
  updateContact
} from '../../contact/contact.operations';
import { handleSuccessSnackbar } from '../../snackbar/snackbar.sagas';

import { contactsReducer as Contact } from '../../contact/contact.reducer';
import Table from '../../table/table.reducer';
import { config } from '../../../configs';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } =
  config.statuses;

describe('Contact sagas tests', () => {
  it('Should receive all contacts and set them to store', async (done) => {
    expectSaga(handleContactsLoad, { payload })
      .withReducer(combineReducers({ Contact, Table }), {
        Contact: initialState,
        Table: mockTableState
      })
      .put(setContactsLoading(true))
      .provide([[call(getContacts, payload.skip, payload.limit), contactRes]])
      .put(setItemsCount(contactRes.count))
      .put(setContacts(contactRes.items))
      .put(setContactsLoading(false))
      .hasFinalState({
        Contact: {
          ...initialState,
          contacts: contactRes.items
        },
        Table: {
          ...mockTableState,
          itemsCount: contactRes.count
        }
      })
      .run()
      .then((res) => {
        const { allEffects: analysis } = res;
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(1);
      });
    done();
  });

  it('Should receive single contact and set to store', async (done) => {
    expectSaga(handleContactLoad, { payload: contact._id })
      .withReducer(combineReducers({ Contact }), {
        Contact: initialState
      })
      .provide([[call(getContactById, contact._id), contact]])
      .put(setContactsLoading(true))
      .put(setContact(contact))
      .put(setContactsLoading(false))
      .hasFinalState({
        Contact: {
          ...initialState,
          contact
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
      });
    done();
  });

  it('Should add single contact and set to store', async (done) => {
    expectSaga(handleAddContact, { payload: newContact })
      .withReducer(combineReducers({ Contact }), {
        Contact: initialState
      })
      .provide([
        [call(addContact, newContact.newContact, newContact.mapImages)],
        [call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)]
      ])
      .put(setContactsLoading(true))
      .put(addContactInStore(newContact.newContact))
      .put(setContactsLoading(false))
      .put(push('/contacts'))
      .hasFinalState({
        Contact: {
          ...initialState,
          contacts: [newContact.newContact]
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(2);
      });
    done();
  });

  it('Should delete contact and remove it from store', async (done) => {
    expectSaga(handleContactDelete, { payload: contact._id })
      .withReducer(combineReducers({ Contact }), {
        Contact: initialState
      })
      .provide([
        [call(deleteContact, contact._id)],
        [call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)]
      ])
      .put(setContactsLoading(true))
      .put(deleteContactInStore(contact._id))
      .put(updatePagination())
      .put(setContactsLoading(false))
      .hasFinalState({
        Contact: {
          ...initialState,
          contacts: []
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(2);
      });
    done();
  });

  it('Should update contact', async (done) => {
    expectSaga(handleContactUpdate, {
      payload: { id: contact._id, updatedContact, mapImages: [] }
    })
      .withReducer(combineReducers({ Contact }), {
        Contact: initialState
      })
      .provide([
        [call(updateContact, contact._id, updatedContact, [])],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .put(setContactsLoading(true))
      .put(updateContactInStore(contact._id, updatedContact))
      .put(push('/contacts'))
      .hasFinalState({
        Contact: {
          ...initialState,
          contactsLoading: true
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(2);
      });
    done();
  });

  it('Should handle error', async (done) => {
    expectSaga(handleContactsError, error)
      .withReducer(combineReducers({ Contact }), {
        Contact: initialState
      })
      .provide([[call(handleSuccessSnackbar, error.message)]])
      .put(setContactsLoading(false))
      .put(setContactsError({ e: error }))
      .hasFinalState({
        Contact: {
          ...initialState,
          contactsLoading: false,
          contactsError: { e: error }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(5);
        expect(analysisCall).toHaveLength(2);
      });
    done();
  });
});
