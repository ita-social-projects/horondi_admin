import { gql } from '@apollo/client';
import { client } from '../../utils/client';

import { newsTranslations } from '../../translations/news.translations';
import { getFromLocalStorage } from '../../services/local-storage.service';

const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

const getContacts = async (skip, limit) => {
  const result = await client.query({
    variables: {
      skip,
      limit
    },
    query: gql`
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
    `
  });
  client.resetStore();
  const { data } = result;
  return data.getContacts;
};

const getContactById = async (id) => {
  const result = await client.query({
    variables: { id },
    query: gql`
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
                medium
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
    `,
    fetchPolicy: 'no-cache'
  });
  const { data } = result;

  if (data.getContactById.message) {
    throw new Error(
      `${data.getContactById.statusCode} ${
        newsTranslations[data.getContactById.message]
      }`
    );
  }

  return data.getContactById;
};

const deleteContact = async (id) => {
  const result = await client.mutate({
    variables: { id },
    context: { headers: { token } },
    mutation: gql`
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
    `,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();
  const { data } = result;

  if (data.deleteContact.message) {
    throw new Error(
      `${data.deleteContact.statusCode} ${
        newsTranslations[data.deleteContact.message]
      }`
    );
  }

  return data.deleteContact;
};

const addContact = async (contact, upload) => {
  const result = await client.mutate({
    variables: { contact, upload },
    context: { headers: { token } },
    mutation: gql`
      mutation($contact: contactInput!, $upload: Upload!) {
        addContact(contact: $contact, upload: $upload) {
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
            email
            link
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();
  const { data } = result;

  if (data.addContact.message) {
    throw new Error(
      `${data.addContact.statusCode} ${
        newsTranslations[data.addContact.message]
      }`
    );
  }

  return data.addContact;
};

const updateContact = async (id, contact) => {
  const result = await client.mutate({
    variables: {
      id,
      contact
    },
    context: { headers: { token } },
    mutation: gql`
      mutation($id: ID!, $contact: contactInput!) {
        updateContact(id: $id, contact: $contact) {
          ... on Contact {
            address {
              lang
              value
            }
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,

    fetchPolicy: 'no-cache'
  });
  client.resetStore();
  const { data } = result;

  if (data.updateContact.message) {
    throw new Error(
      `${data.updateContact.statusCode} ${
        newsTranslations[data.updateContact.message]
      }`
    );
  }

  return data.updateContact;
};

export {
  getContacts,
  deleteContact,
  getContactById,
  addContact,
  updateContact
};
