import { gql } from '@apollo/client';
import { client } from '../../utils/client';

export const loginAdmin = async (loginInput) => {
  const result = await client.mutate({
    mutation: gql`
      mutation($loginInput: LoginInput!) {
        loginAdmin(loginInput: $loginInput) {
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
            email
            firstName
            lastName
            phoneNumber
            purchasedProducts
            role
            orders
            wishlist
            credentials {
              source
            }
            address {
              country
              city
              street
              appartment
              buildingNumber
            }
          }
          ... on Error {
            statusCode
            message
          }
        }
      }
    `,
    context: {
      headers: {
        token
      }
    }
  });
  const { data } = result;

  return data.getUserByToken;
};
