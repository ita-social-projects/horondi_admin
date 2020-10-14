import {
  setContacts,
  getContacts,
  setContactsLoading,
  deleteContact,
  addContact,
  updateContact,
  setContact,
  getContact,
  setContactsError,
  setContactsPerPage,
  setContactsCurrentPage,
  setContactsPagesCount,
  addContactInStore,
  deleteContactInStore,
  updateContactInStore
} from '../contact.actions';
import {
  GET_CONTACTS,
  SET_CONTACTS,
  SET_CONTACTS_LOADING,
  DELETE_CONTACT,
  ADD_CONTACT,
  GET_CONTACT,
  SET_CONTACT,
  UPDATE_CONTACT,
  SET_CONTACTS_ERROR,
  SET_CONTACTS_CURRENT_PAGE,
  SET_CONTACTS_PER_PAGE,
  SET_CONTACTS_PAGES_COUNT,
  ADD_CONTACT_IN_STORE,
  DELETE_CONTACT_IN_STORE,
  UPDATE_CONTACT_IN_STORE
} from '../contact.types';
import {
  contact,
  contactId as id,
  updatedContact,
  mapImages,
  contactsPagesCount,
  contactsPerPage,
  contactsCurrentPage
} from './contact.variables';

describe('Contact actions tests', () => {
  it('Should get contact', () => {
    expect(getContact(id)).toEqual({
      type: GET_CONTACT,
      payload: id
    });
  });

  it('Should add contact', () => {
    expect(addContact(contact, mapImages)).toEqual({
      type: ADD_CONTACT,
      payload: {
        newContact: contact,
        mapImages
      }
    });
  });

  it('Should set contact', () => {
    expect(setContact(contact)).toEqual({
      type: SET_CONTACT,
      payload: contact
    });
  });

  it('Should get contacts', () => {
    expect(getContacts()).toEqual({
      type: GET_CONTACTS
    });
  });

  it('Should set contacts', () => {
    expect(setContacts(contact)).toEqual({
      type: SET_CONTACTS,
      payload: contact
    });
  });

  it('Should set contacts loading to true', () => {
    expect(setContactsLoading(true)).toEqual({
      type: SET_CONTACTS_LOADING,
      payload: true
    });
  });

  it('Should set contact error to true', () => {
    expect(setContactsError(true)).toEqual({
      type: SET_CONTACTS_ERROR,
      payload: true
    });
  });

  it('Should update contact', () => {
    expect(updateContact(updatedContact)).toEqual({
      type: UPDATE_CONTACT,
      payload: updatedContact
    });
  });

  it('Should delete contact', () => {
    const contactToDelete = '0c3c7929dd85de268bed4fe8';
    expect(deleteContact(contactToDelete)).toEqual({
      type: DELETE_CONTACT,
      payload: contactToDelete
    });
  });

  it('Should set contacts current page', () => {
    expect(setContactsCurrentPage(contactsCurrentPage)).toEqual({
      type: SET_CONTACTS_CURRENT_PAGE,
      payload: contactsCurrentPage
    });
  });

  it('Should set number of contacts per page', () => {
    expect(setContactsPerPage(contactsPerPage)).toEqual({
      type: SET_CONTACTS_PER_PAGE,
      payload: contactsPerPage
    });
  });

  it('Should set contact pages count', () => {
    expect(setContactsPagesCount(contactsPagesCount)).toEqual({
      type: SET_CONTACTS_PAGES_COUNT,
      payload: contactsPagesCount
    });
  });

  it('Should add contact locally', () => {
    expect(addContactInStore(contact)).toEqual({
      type: ADD_CONTACT_IN_STORE,
      payload: contact
    });
  });

  it('Should delete contact locally', () => {
    expect(deleteContactInStore(id)).toEqual({
      type: DELETE_CONTACT_IN_STORE,
      payload: id
    });
  });

  it('Should update contact locally', () => {
    expect(updateContactInStore(id, updatedContact)).toEqual({
      type: UPDATE_CONTACT_IN_STORE,
      payload: { id, updatedContact }
    });
  });
});
