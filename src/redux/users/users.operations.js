import { gql } from '@apollo/client';
import { client } from '../../utils/client';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { config } from '../../configs';

const formError = (err) => err.message.replace('GraphQL error: ', '');
const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

const getAllUsers = async () => {
  const result = await client.query({
    query: gql`
      {
        getAllUsers {
          _id
          firstName
          lastName
          email
          phoneNumber
          banned
        }
      }
    `,
    context: {
      headers: {
        token
      }
    },
    fetchPolicy: 'no-cache'
  });

  const { data } = result;

  return data.getAllUsers;
};

const getUserById = async (id) => {
  const result = await client
    .query({
      variables: { id },
      query: gql`
        query($id: ID!) {
          getUserById(id: $id) {
            ... on User {
              firstName
              lastName
              email
              address {
                country
                city
                buildingNumber
                appartment
                street
                zipcode
              }
              banned
            }
          }
        }
      `,
      context: {
        headers: {
          token
        }
      },
      fetchPolicy: 'no-cache'
    })
    .catch((err) => {
      throw new Error(`Помилка: ${config.errorMessages[formError(err)]}`);
    });

  const { data } = result;

  return data.getUserById;
};

const deleteUser = async (id) => {
  const result = await client
    .mutate({
      variables: { id },
      mutation: gql`
        mutation($id: ID!) {
          deleteUser(id: $id) {
            firstName
            lastName
          }
        }
      `,
      context: {
        headers: {
          token
        }
      },
      fetchPolicy: 'no-cache'
    })
    .catch((err) => {
      throw new Error(`Помилка: ${config.errorMessages[formError(err)]}`);
    });

  const { data } = result;

  return data.deleteUser;
};

const switchUserStatus = async (id) => {
  const result = await client.mutate({
    variables: { id },
    mutation: gql`
      mutation($id: ID!) {
        switchUserStatus(id: $id) {
          ... on SuccessfulResponse {
            isSuccess
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    context: {
      headers: {
        token
      }
    },
    fetchPolicy: 'no-cache'
  });

  const { data } = result;

  if (data.switchUserStatus.message) {
    throw new Error(
      `Помилка: ${config.errorMessages[data.switchUserStatus.message]}`
    );
  }

  return data.switchUserStatus;
};

export { getAllUsers, getUserById, deleteUser, switchUserStatus };
