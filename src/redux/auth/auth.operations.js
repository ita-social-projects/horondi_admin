import { gql } from '@apollo/client';
import { client } from '../../utils/client';

export const loginAdmin = async (loginInput) => {
  const result = await client.mutate({
    mutation: gql`
      mutation($loginInput: LoginInput!) {
        loginAdmin(loginInput: $loginInput) {
          _id
          token
        }
      }
    `,
    variables: { loginInput }
  });
  const { data } = result;

  return data.loginAdmin;
};

export const getUserByToken = async (token) => {
  const result = await client.query({
    query: gql`
      query {
        getUserByToken {
          ... on User {
            _id
            email
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

  // костилі, чекають фікс на беку
  if (data.getUserByToken.statusCode === 401) {
    throw new Error('USER_NOT_AUTHORIZED');
  }
  return data.getUserByToken;
};
