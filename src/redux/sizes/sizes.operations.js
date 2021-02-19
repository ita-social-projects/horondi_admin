import { gql } from '@apollo/client';

import { config } from '../../configs';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { client } from '../../utils/client';

const formError = (error) => error.message.replace('GraphQL error: ', '');

export const getAllSizes = async () => {
  const result = await client.query({
    query: gql`
      query {
        getAllSizes {
          _id
          name
          simpleName {
            lang
            value
          }
          heightInCm
          widthInCm
          depthInCm
          volumeInLiters
          weightInKg
          available
        }
      }
    `
  });
  return result.data.getAllSizes;
};

export const getSizeById = async (id) => {
  const result = await client.query({
    variables: { id },
    query: gql`
      query($id: ID!) {
        getSizeById(id: $id) {
          ... on Size {
            name
            simpleName {
              lang
              value
            }
            heightInCm
            widthInCm
            depthInCm
            volumeInLiters
            weightInKg
            available
            additionalPrice {
              currency
              value
            }
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });

  return result.data.getSizeById;
};

export const addSize = async (size) => {
  const token = getFromLocalStorage(config.tokenName);
  const result = await client.mutate({
    context: { headers: { token } },
    variables: {
      size
    },
    mutation: gql`
      mutation($size: SizeInput!) {
        addSize(size: $size) {
          ... on Size {
            _id
            name
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
  client.resetStore();

  if (result.data.addSize.message) {
    throw new Error(
      `${result.data.addSize.statusCode} ${[result.data.addSize.message]}`
    );
  }

  return result.data.addSize;
};

export const updateSize = async (id, size) => {
  const token = getFromLocalStorage(config.tokenName);
  const result = await client.mutate({
    context: { headers: { token } },
    variables: {
      id,
      size
    },
    mutation: gql`
      mutation($id: ID!, $size: SizeInput!) {
        updateSize(id: $id, size: $size) {
          ... on Size {
            _id
            name
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
  client.resetStore();

  if (result.data.updateSize.message) {
    throw new Error(
      `${result.data.updateSize.statusCode} ${[result.data.updateSize.message]}`
    );
  }
  console.log(result);
  return result.data.updateSize;
};

export const deleteSize = async (id) => {
  const token = getFromLocalStorage(config.tokenName);
  const result = await client
    .mutate({
      context: { headers: { token } },
      variables: { id },
      mutation: gql`
        mutation($id: ID!) {
          deleteSize(id: $id) {
            ... on Size {
              _id
              name
              available
            }
            ... on Error {
              statusCode
              message
            }
          }
        }
      `,
      fetchPolicy: 'no-cache'
    })
    .catch((error) => {
      throw new Error(`Помилка: ${config.errorMessages[formError(error)]}`);
    });

  client.resetStore();

  return result.data.deleteSize;
};
