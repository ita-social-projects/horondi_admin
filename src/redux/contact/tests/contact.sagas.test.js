import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  handleContactsLoad,
  handleContactLoad,
  handleAddContact,
  handleContactDelete,
  handleContactUpdate,
  handleContactsError
} from '../contact.sagas';
import {
  setContacts,
  setContactsLoading,
  setContact,
  setContactsError,
  setContactsPagesCount,
  deleteContactInStore,
  addContactInStore,
  updateContactInStore
} from '../contact.actions';

import {
  contact,
  payload,
  contactRes,
  newContact,
  updatedContact,
  error,
  initialState
} from './contact.variables';
import {
  getContacts,
  deleteContact,
  getContactById,
  addContact,
  updateContact
} from '../contact.operations';
import { handleSuccessSnackbar } from '../../snackbar/snackbar.sagas';
import contactReducer from '../contact.reducer';
import { config } from '../../../configs';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

describe('Contact sagas tests', () => {
  it('Should receive all contacts and set them to store', () =>
    expectSaga(handleContactsLoad, { payload })
      .withReducer(contactReducer)
      .provide([[call(getContacts, payload.skip, payload.limit), contactRes]])
      .put(setContactsLoading(true))
      .put(
        setContactsPagesCount(
          Math.ceil(contactRes.count / payload.contactsPerPage)
        )
      )
      .put(setContacts(contactRes.items))
      .put(setContactsLoading(false))
      .hasFinalState({
        ...initialState,
        contacts: contactRes.items
      })
      .run()
      .then((res) => {
        const { allEffects: analysis } = res;
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(1);
      }));

  it('Should receive single contact and set to store', () =>
    expectSaga(handleContactLoad, { payload: contact._id })
      .withReducer(contactReducer)
      .provide([[call(getContactById, contact._id), contact]])
      .put(setContactsLoading(true))
      .put(setContact(contact))
      .put(setContactsLoading(false))
      .hasFinalState({
        ...initialState,
        contact
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
      }));

  it('Should add single contact and set to store', () =>
    expectSaga(handleAddContact, { payload: newContact })
      .withReducer(contactReducer)
      .provide([
        [call(addContact, newContact.newContact, newContact.mapImages)],
        [call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)]
      ])
      .put(setContactsLoading(true))
      .put(addContactInStore(newContact.newContact))
      .put(setContactsLoading(false))
      .put(push('/contacts'))
      .hasFinalState({
        ...initialState,
        contacts: [newContact.newContact]
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(2);
      }));

  it('Should delete contact and remove it from store', () =>
    expectSaga(handleContactDelete, { payload: contact._id })
      .withReducer(contactReducer)
      .provide([
        [call(deleteContact, contact._id)],
        [call(getContacts, payload.skip, payload.limit), contactRes],
        [call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)]
      ])
      .put(setContactsLoading(true))
      .put(deleteContactInStore(contact._id))
      .put(
        setContactsPagesCount(
          Math.ceil(contactRes.count / payload.contactsPerPage)
        )
      )
      .put(setContacts(contactRes.items))
      .put(setContactsLoading(false))
      .hasFinalState({
        ...initialState,
        contacts: contactRes.items
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(6);
        expect(analysisCall).toHaveLength(3);
      }));

  it('Should update contact', () =>
    expectSaga(handleContactUpdate, {
      payload: { id: contact._id, updatedContact, mapImages: [] }
    })
      .withReducer(contactReducer)
      .provide([
        [call(updateContact, contact._id, updatedContact, [])],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .put(setContactsLoading(true))
      .put(updateContactInStore(contact._id, updatedContact))
      .put(push('/contacts'))
      .hasFinalState({
        ...initialState,
        contactsLoading: true
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(2);
      }));

  it('Should handle error', () =>
    expectSaga(handleContactsError, error)
      .withReducer(contactReducer)
      .provide([[call(handleSuccessSnackbar, error.message)]])
      .put(setContactsLoading(false))
      .put(setContactsError({ e: error }))
      .hasFinalState({
        ...initialState,
        contactsLoading: false,
        contactsError: { e: error.message }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(5);
        expect(analysisCall).toHaveLength(2);
      }));
});
