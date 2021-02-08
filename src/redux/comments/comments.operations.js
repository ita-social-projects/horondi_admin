import { gql } from '@apollo/client';
import { client } from '../../utils/client';

import { config } from '../../configs';
import { getFromLocalStorage } from '../../services/local-storage.service';

const formError = (error) => error.message.replace('GraphQL error: ', '');

const getAllComments = async (skip, limit) => {
  const result = await client.query({
    variables: {
      skip,
      limit
    },
    query: gql`
      query($skip: Int, $limit: Int) {
        getAllComments(skip: $skip, limit: $limit) {
          items {
            _id
            text
            date
            user {
              _id
              firstName
              email
            }
            product {
              _id
            }
            show
          }
          count
        }
      }
    `
  });
  client.resetStore();
  return result.data.getAllComments;
};

const deleteComment = async (id) => {
  const token = getFromLocalStorage(config.tokenName);
  const result = await client
    .mutate({
      context: { headers: { token } },
      variables: { id },
      mutation: gql`
        mutation($id: ID!) {
          deleteComment(id: $id) {
            ... on Comment {
              _id
              text
              date
              user {
                _id
                email
              }
              product {
                _id
              }
              show
            }
            ... on Error {
              message
              statusCode
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

  return result.data.deleteComment;
};

export { getAllComments, deleteComment };
