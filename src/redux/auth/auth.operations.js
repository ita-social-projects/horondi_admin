import { gql } from 'apollo-boost';
import { client } from '../../utils/client';

export const loginAdmin = async (loginInput) => {
  const result = await client.mutate({
    mutation: gql`
      mutation($loginInput: userLoginInput!) {
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
