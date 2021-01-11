export const selectContactsAndTable = ({ Contact, Table }) => ({
  contacts: Contact.contacts,
  loading: Contact.ContactLoading,
  currentPage: Table.pagination.currentPage,
  rowsPerPage: Table.pagination.rowsPerPage,
  itemsCount: Table.itemsCount
});

export const selectContact = ({ Contact }) => ({
  loading: Contact.contactsLoading,
  contact: Contact.contact
});
