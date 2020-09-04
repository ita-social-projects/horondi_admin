
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
  SET_CONTACTS_PAGES_COUNT
} from './news.types';

const setContactsCurrentPage = (payload) => ({
  type: SET_CONTACTS_CURRENT_PAGE,
  payload
});

const setContactsPerPage = (payload) => ({
  type: SET_CONTACTS_PER_PAGE,
  payload
});

const setContactsPagesCount = (payload) => ({
  type: SET_CONTACTS_PAGES_COUNT,
  payload
});

const setContacts = (news) => ({
  type: SET_CONTACTS,
  payload: news
});

const getContacts = (payload) => ({
  type: GET_CONTACTS,
  payload
});

const addContact = (payload) => ({
  type: ADD_CONTACT,
  payload
});

const deleteContact = (payload) => ({
  type: DELETE_CONTACT,
  payload
});

const updateContact = (payload) => ({
  type: UPDATE_CONTACT,
  payload
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
  setContactsPerPage,
  setContactsCurrentPage,
  setContactsPagesCount
};
