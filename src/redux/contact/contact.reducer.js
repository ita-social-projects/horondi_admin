import {
  SET_CONTACTS,
  SET_CONTACTS_LOADING,
  SET_CONTACT,
  SET_CONTACTS_ERROR,
  SET_CONTACTS_CURRENT_PAGE,
  SET_CONTACTS_PER_PAGE,
  SET_CONTACTS_PAGES_COUNT,
  ADD_CONTACT_IN_STORE,
  DELETE_CONTACT_IN_STORE,
  UPDATE_CONTACT_IN_STORE
} from './contact.types';

const initialState = {
  contacts: [],
  contact: null,
  contactsLoading: false,
  contactsError: null,
  pagination: {
    contactsCurrentPage: 0,
    contactsPerPage: 6,
    contactPagesCount: 1
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
          contactsCurrentPage: action.payload - 1
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
          contactPagesCount: action.payload
        }
      };
    case ADD_CONTACT_IN_STORE:
      return {
        ...state,
        contacts: state.contacts.push(action.payload)
      };
    case DELETE_CONTACT_IN_STORE:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        )
      };
    case UPDATE_CONTACT_IN_STORE:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload._id
            ? (contact = action.payload.updatedContact)
            : contact
        )
      };
    default:
      return state;
  }
};

export default contactsReducer;
