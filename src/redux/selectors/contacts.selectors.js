import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectContact } from '../contact/contact.reducer';

export const contactSelector = createSelector(
  selectContact,
  (contact) => contact
);

export const selectProductLoading = ({ Contact }) => ({
  contactsLoading: Contact.contactsLoading
});

export const selectSelectedContact = ({ Contact }) => ({
  contact: Contact.selectedContact
});

export const contactLoading = createSelector(
  selectProductLoading,
  selectContact,
  (loading, contact) => ({
    ...loading,
    ...contact
  })
);

export const contactSelectorWithPagination = createSelector(
  contactSelector,
  selectPagination,
  (contact, table) => ({
    ...contact,
    ...table
  })
);
