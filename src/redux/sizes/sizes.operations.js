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
