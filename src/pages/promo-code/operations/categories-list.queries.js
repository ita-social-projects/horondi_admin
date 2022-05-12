import { gql } from '@apollo/client';

export const getCategoriesList = gql`
  query {
    getAllCategories {
      items {
        code
        name {
          value
        }
      }
    }
  }
`;
