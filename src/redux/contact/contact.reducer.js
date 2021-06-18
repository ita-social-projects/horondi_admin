import {
  SET_CONTACTS,
  SET_CONTACTS_LOADING,
  SET_CONTACT,
  SET_CONTACTS_ERROR,
  ADD_CONTACT_IN_STORE,
  DELETE_CONTACT_IN_STORE,
  UPDATE_CONTACT_IN_STORE
} from './contact.types';

export const selectContact = ({ Contact }) => ({
  contacts: Contact.contacts,
  loading: Contact.ContactLoading,
  contact: Contact.contact
});

const initialState = {
  contacts: [],
  contact: null,
  contactsLoading: false,
  contactsError: null
};

export const contactsReducer = (state = initialState, action = {}) => {
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
    case ADD_CONTACT_IN_STORE:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
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
            ? action.payload.updatedContact
            : contact
        )
      };
    default:
      return state;
  }
};
