import {
  contact,
  contactId,
  contactsPagesCount,
  contactsPerPage,
  contactsCurrentPage,
  initialState,
  updatedContact
} from './contact.variables';
import {
  setContacts,
  setContactsLoading,
  setContact,
  setContactsError,
  setContactsPerPage,
  setContactsCurrentPage,
  setContactsPagesCount,
  addContactInStore,
  deleteContactInStore,
  updateContactInStore
} from '../contact.actions';

import { contactsReducer } from '../contact.reducer';

describe('Contacts reducer tests', () => {
  it('Should return default state', () => {
    expect(contactsReducer()).toEqual(initialState);
  });

  it('Should set contact to store', () => {
    expect(contactsReducer(initialState, setContact(contact))).toEqual({
      ...initialState,
      contact
    });
  });

  it('Should set contacts to store', () => {
    expect(contactsReducer(initialState, setContacts(contact))).toEqual({
      ...initialState,
      contacts: contact
    });
  });

  it('Should set contact loading to true', () => {
    expect(contactsReducer(initialState, setContactsLoading(true))).toEqual({
      ...initialState,
      contactsLoading: true
    });
  });

  it('Should set contact error to true', () => {
    expect(contactsReducer(initialState, setContactsError(true))).toEqual({
      ...initialState,
      contactsError: true
    });
  });

  it('Should set contact locally', () => {
    expect(contactsReducer(initialState, addContactInStore(contact))).toEqual({
      ...initialState,
      contacts: [...initialState.contacts, contact]
    });
  });

  it('Should update contacts locally', () => {
    expect(
      contactsReducer(initialState, updateContactInStore(contact))
    ).toEqual({
      ...initialState,
      contacts: initialState.contacts.map((el) =>
        el._id === contactId ? updatedContact : el
      )
    });
  });

  it('Should delete contact locally', () => {
    expect(
      contactsReducer(initialState, deleteContactInStore(contactId))
    ).toEqual({
      ...initialState,
      contacts: initialState.contacts.filter((el) => el._id !== contactId)
    });
  });

  it('Should set contacts current page', () => {
    expect(
      contactsReducer(initialState, setContactsCurrentPage(contactsCurrentPage))
    ).toEqual({
      ...initialState,
      pagination: {
        contactPagesCount: initialState.pagination.contactPagesCount,
        contactsCurrentPage: contactsCurrentPage - 1,
        contactsPerPage: initialState.pagination.contactsPerPage
      }
    });
  });

  it('Should set contacts pages count', () => {
    expect(
      contactsReducer(initialState, setContactsPagesCount(contactsPagesCount))
    ).toEqual({
      ...initialState,
      pagination: {
        contactPagesCount: contactsPagesCount,
        contactsCurrentPage: initialState.pagination.contactsCurrentPage,
        contactsPerPage: initialState.pagination.contactsPerPage
      }
    });
  });

  it('Should set number of contacts per page', () => {
    expect(
      contactsReducer(initialState, setContactsPerPage(contactsPerPage))
    ).toEqual({
      ...initialState,
      pagination: {
        contactPagesCount: initialState.pagination.contactPagesCount,
        contactsCurrentPage: initialState.pagination.contactsCurrentPage,
        contactsPerPage
      }
    });
  });
});
