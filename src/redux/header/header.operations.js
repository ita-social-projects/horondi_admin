import { gql } from '@apollo/client';
import { client } from '../../utils/client';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { headerTranslations } from '../../translations/header.translations';

export const getAllHeaders = async (skip, limit) => {
  const result = await client.query({
    query: gql`
      query {
        getAllHeaders {
          _id
          link
          title {
            lang
            value
          }
          priority
        }
      }
    `
  });
  client.resetStore();

  return result.data.getAllHeaders;
};

export const getHeaderById = async (id) => {
  const result = await client.query({
    variables: { id },
    query: gql`
      query($id: ID!) {
        getHeaderById(id: $id) {
          ... on Header {
            _id
            link
            title {
              lang
              value
            }
            priority
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
  const { data } = result;
  if (data.getHeaderById.message) {
    throw new Error(
      `${data.getHeaderById.statusCode} ${
        headerTranslations[data.getHeaderById.message]
      }`
    );
  }

  return data.getHeaderById;
};

export const deleteHeader = async (id) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

  const result = await client.mutate({
    variables: { id },
    context: { headers: { token } },
    mutation: gql`
      mutation($id: ID!) {
        deleteHeader(id: $id) {
          ... on Header {
            _id
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

  if (data.deleteHeader.message) {
    throw new Error(
      `${data.deleteHeader.statusCode} ${
        headerTranslations[data.deleteHeader.message]
      }`
    );
  }

  return data.deleteHeader;
};

export const createHeader = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

  const result = await client.mutate({
    context: { headers: { token } },
    variables: payload,

    mutation: gql`
      mutation($header: HeaderInput!) {
        addHeader(header: $header) {
          ... on Header {
            _id
            link
            title {
              lang
              value
            }
            priority
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

  if (data.addHeader.message) {
    throw new Error(
      `${data.addHeader.statusCode} ${
        headerTranslations[data.addHeader.message]
      }`
    );
  }

  return data.addHeader;
};

export const updateHeader = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const { id, header, image } = payload;
  const result = await client.mutate({
    context: { headers: { token } },
    variables: { id, header, image },
    mutation: gql`
      mutation($id: ID!, $header: HeaderInput!) {
        updateHeader(id: $id, header: $header) {
          ... on Header {
            _id
            link
            title {
              lang
              value
            }
            priority
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
  if (data.updateHeader.message) {
    throw new Error(
      `${data.updateHeader.statusCode} ${
        headerTranslations[data.updateHeader.message]
      }`
    );
  }

  return data.updateHeader;
};
