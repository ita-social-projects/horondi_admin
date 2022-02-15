import { gql } from '@apollo/client';

export const getAllUsers = gql`
  query {
    getAllUsers {
      items {
        _id
        firstName
        lastName
      }
    }
  }
`;
