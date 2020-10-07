import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  handleContactsLoad,
  handleContactLoad,
  handleAddContact,
  handleContactUpdate,
  handleContactDelete
} from '../contact.sagas';
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
} from '../contact.actions';

import {
  contact,
  mapImages,
  contactsPagesCount,
  contactId,
  contactUpdateIdMock,
  allContactsMock,
  contactByIdMock,
  contactDeleteIdMock
} from './contact.variables';
import {
  getContacts,
  deleteContact,
  getContactById,
  addContact,
  updateContact
} from '../contact.operations';

describe('Contact sagas tests', () => {
  it('Should not throw error during execution', () => {
    expect(handleAddContact).not.toThrow();
    expect(getContacts).not.toThrow();
    expect(deleteContact).not.toThrow();
    expect(getContactById).not.toThrow();
    expect(addContact).not.toThrow();
    expect(updateContact).not.toThrow();
  });

  it('Should receive all contacts and set them to store', () => {
    expectSaga(handleContactsLoad)
      .provide([[matchers.call.fn(getContacts), allContactsMock]])
      .put(setContactsLoading(true))
      .put(setContacts(allContactsMock))
      .put(setContactsLoading(false))
      .run();
  });

  it('Should receive single contact and set to store', () => {
    expectSaga(handleContactLoad, contactId)
      .provide([[matchers.call.fn(getContactById), contactByIdMock]])
      .put(setContactsLoading(true))
      .put(setContact(contactByIdMock))
      .put(setContactsPagesCount(contactsPagesCount - 1))
      .put(setContactsLoading(false))
      .run();
  });

  it('Should delete contact and remove it from store', () => {
    expectSaga(handleContactDelete, contactId)
      .provide([[matchers.call.fn(deleteContact), contactDeleteIdMock]])
      .put(setContactsLoading(true))
      .put(setContact(contactDeleteIdMock))
      .put(deleteContactInStore(contactId))
      .put(setContactsPagesCount(contactsPagesCount - 1))
      .put(setContactsLoading(false))
      .run();
  });

  it('Should update contact in db and update it in store', () => {
    expectSaga(handleContactUpdate, contactId, contact, mapImages)
      .provide([[matchers.call.fn(updateContact), contactUpdateIdMock]])
      .put(setContactsLoading(true))
      .put(setContact(contactUpdateIdMock))
      .put(updateContactInStore(contactId))
      .put(setContactsPagesCount(contactsPagesCount - 1))
      .put(setContactsLoading(false))
      .run();
  });
});
