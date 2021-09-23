import { setItems, getItems } from '../../utils/client';
import { contactErrors } from '../../configs/error-modal-messages';

const getContacts = async (skip, limit) => {
  const query = `
      query($skip: Int, $limit: Int) {
        getContacts(skip: $skip, limit: $limit) {
          items {
            _id
            phoneNumber
            openHours {
              lang
              value
            }
            address {
              lang
              value
            }
            email
            link
          }
          count
        }
      }
    `;
  const result = await getItems(query, { skip, limit });

  return result?.data?.getContacts;
};

const getContactById = async (id) => {
  const query = `
      query($id: ID!) {
        getContactById(id: $id) {
          ... on Contact {
            phoneNumber
            openHours {
              lang
              value
            }
            address {
              lang
              value
            }
            email
            images {
              lang
              value {
                thumbnail
              }
            }
            link
          }
          ... on Error {
            statusCode
            message
          }
        }
      }
    `;
  const result = await getItems(query, { id });

  if (
    Object.keys(contactErrors).includes(result?.data?.getContactById?.message)
  ) {
    throw new Error(
      `${result.data?.getContactById.statusCode} ${
        contactErrors[result.data?.getContactById.message]
      }`
    );
  }

  return result?.data?.getContactById;
};

const deleteContact = async (id) => {
  const query = `
      mutation($id: ID!) {
        deleteContact(id: $id) {
          ... on Contact {
            phoneNumber
            address {
              lang
              value
            }
            email
            link
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;
  const result = await setItems(query, { id });

  if (
    Object.keys(contactErrors).includes(result?.data?.deleteContact?.message)
  ) {
    throw new Error(
      `${result.data.deleteContact.statusCode} ${
        contactErrors[result.data.deleteContact.message]
      }`
    );
  }

  return result?.data?.deleteContact;
};

const addContact = async (contact, mapImages) => {
  const query = `
      mutation($contact: contactInput!, $mapImages: [MapImage]!) {
        addContact(contact: $contact, mapImages: $mapImages) {
          ... on Contact {
            _id
            phoneNumber
            openHours {
              lang
              value
            }
            address {
              lang
              value
            }
            images {
              value {
                thumbnail
              }
            }
            email
            link
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;
  const result = await setItems(query, { contact, mapImages });

  if (Object.keys(contactErrors).includes(result?.data?.addContact?.message)) {
    throw new Error(
      `${result.data.addContact.statusCode} ${
        contactErrors[result.data.addContact.message]
      }`
    );
  }

  return result?.data?.addContact;
};

const updateContact = async (id, contact, mapImages) => {
  const query = `
      mutation($id: ID!, $contact: contactInput!, $mapImages: [MapImage]!) {
        updateContact(id: $id, contact: $contact, mapImages: $mapImages) {
          ... on Contact {
            address {
              lang
              value
            }
            email
            link
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await setItems(query, { id, contact, mapImages });

  if (
    Object.keys(contactErrors).includes(result?.data?.updateContact?.message)
  ) {
    throw new Error(
      `${result.data.updateContact.statusCode} ${
        contactErrors[result.data.updateContact.message]
      }`
    );
  }

  return result?.data?.updateContact;
};

export {
  getContacts,
  deleteContact,
  getContactById,
  addContact,
  updateContact
};
