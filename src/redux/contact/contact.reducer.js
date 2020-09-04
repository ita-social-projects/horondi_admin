import {
  SET_CONTACTS,
  SET_CONTACTS_LOADING,
  SET_CONTACT,
  SET_CONTACTS_ERROR,
  SET_CONTACTS_CURRENT_PAGE,
  SET_CONTACTS_PER_PAGE,
  SET_CONTACTS_PAGES_COUNT
} from './contact.types';

const initialState = {
  contacts: [],
  contact: null,
  contactsLoading: false,
  contactsError: null,
  pagination: {
    currentPage: 0,
    contactsPerPage: 6,
    pagesCount: 1
  }
};

const contactsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_CONTACTS:
    return {
      ...state,
      contacts: action.payload
    };

  case SET_CONTACT:
    return {
      ...state,
      contact: action.payload
    };

  case SET_CONTACTS_LOADING:
    return {
      ...state,
      contactsLoading: action.payload
    };

  case SET_CONTACTS_ERROR:
    return {
      ...state,
      contactsError: action.payload
    };

  case SET_CONTACTS_CURRENT_PAGE:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: action.payload - 1
      }
    };

  case SET_CONTACTS_PER_PAGE:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        contactsPerPage: action.payload
      }
    };

  case SET_CONTACTS_PAGES_COUNT:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        pagesCount: action.payload
      }
    };
  default:
    return state;
  }
};

export default contactsReducer;
