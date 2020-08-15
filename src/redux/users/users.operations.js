import { gql } from 'apollo-boost';
import { client } from '../../utils/client';

import { userTranslations } from '../../translations/users.translations';

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
    `
  });
  const { data } = result;

  return data.getAllUsers;
};

const getUserById = async (id) => {
  const result = await client.query({
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
    fetchPolicy: 'no-cache'
  });
  const { errors, data } = result;

  if (errors) {
    throw new Error(`Помилка: ${userTranslations[errors[0].message]}`);
  }

  return data.getUserById;
};

const deleteUser = async (id) => {
  const result = await client.mutate({
    variables: { id },
    mutation: gql`
      mutation($id: ID!) {
        deleteUser(id: $id) {
          firstName
          lastName
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });

  const { errors, data } = result;

  if (errors) {
    throw new Error(`Помилка: ${userTranslations[errors[0].message]}`);
  }

  return data.deleteUser;
};

const switchUserStatus = async (id) => {
  const result = client.mutate({
    variables: { id },
    mutation: gql`
      mutation($id: ID!) {
        switchUserStatus(id: $id)
      }
    `,
    fetchPolicy: 'no-cache'
  });

  const { data, errors } = result;

  if (errors) {
    throw new Error(`Помилка: ${userTranslations[errors[0].message]}`);
  }

  return data.switchUserStatus;
};

export { getAllUsers, getUserById, deleteUser, switchUserStatus };
