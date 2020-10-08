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
  setContactsPagesCount,
  deleteContactInStore,
  updateContactInStore
} from '../contact.actions';

import {
  contact,
  mapImages,
  contactsPagesCount,
  contactId,
  contactUpdateMock,
  allContactsMock,
  contactByIdMock,
  contactDeleteIdMock,
  getContactsMock as payload
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
    expect(setContactsError).not.toThrow();
  });

  it('Should receive all contacts and set them to store', () => {
    expectSaga(handleContactsLoad, payload)
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
});
