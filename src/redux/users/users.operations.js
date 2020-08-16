import { gql } from 'apollo-boost';
import { client } from '../../utils/client';
import { getFromLocalStorage } from '../../services/local-storage.service';

import { userTranslations } from '../../translations/users.translations';

const transformError = (err) => err.message.replace('GraphQL error: ', '');
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
      throw new Error(`Помилка: ${userTranslations[transformError(err)]}`);
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
      throw new Error(`Помилка: ${userTranslations[transformError(err)]}`);
    });

  const { data } = result;

  return data.deleteUser;
};

const switchUserStatus = async (id) => {
  const result = await client
    .mutate({
      variables: { id },
      mutation: gql`
        mutation($id: ID!) {
          switchUserStatus(id: $id)
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
      throw new Error(`Помилка: ${userTranslations[transformError(err)]}`);
    });

  const { data } = result;

  return data.switchUserStatus;
};

export { getAllUsers, getUserById, deleteUser, switchUserStatus };
