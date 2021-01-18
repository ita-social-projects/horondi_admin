import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectContact } from '../contact/contact.reducer';

export const contactSelector = createSelector(
  selectContact,
  (contact) => contact
);

export const contactSelectorWithPagination = createSelector(
  contactSelector,
  selectPagination,
  (contact, table) => ({
    ...contact,
    ...table
  })
);
