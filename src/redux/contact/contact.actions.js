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
  ADD_CONTACT_IN_STORE,
  DELETE_CONTACT_IN_STORE,
  UPDATE_CONTACT_IN_STORE
} from './contact.types';

const setContacts = (contacts) => ({
  type: SET_CONTACTS,
  payload: contacts
});

const getContacts = (payload) => ({
  type: GET_CONTACTS,
  payload
});

const addContact = (newContact, mapImages) => ({
  type: ADD_CONTACT,
  payload: {
    newContact,
    mapImages
  }
});

const deleteContact = (payload) => ({
  type: DELETE_CONTACT,
  payload
});

const updateContact = (payload) => ({
  type: UPDATE_CONTACT,
  payload
});

const addContactInStore = (payload) => ({
  type: ADD_CONTACT_IN_STORE,
  payload
});

const deleteContactInStore = (id) => ({
  type: DELETE_CONTACT_IN_STORE,
  payload: id
});

const updateContactInStore = (id, updatedContact) => ({
  type: UPDATE_CONTACT_IN_STORE,
  payload: { id, updatedContact }
});

const setContactsLoading = (loading) => ({
  type: SET_CONTACTS_LOADING,
  payload: loading
});

const setContact = (payload) => ({
  type: SET_CONTACT,
  payload
});

const getContact = (payload) => ({
  type: GET_CONTACT,
  payload
});

const setContactsError = (error) => ({
  type: SET_CONTACTS_ERROR,
  payload: error
});

export {
  setContacts,
  getContacts,
  setContactsLoading,
  deleteContact,
  addContact,
  updateContact,
  setContact,
  getContact,
  setContactsError,
  addContactInStore,
  deleteContactInStore,
  updateContactInStore
};
