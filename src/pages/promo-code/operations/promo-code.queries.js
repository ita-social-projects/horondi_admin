import { gql } from '@apollo/client';

export const getAllPromoCodes = gql`
  query {
    getAllPromoCodes {
      items {
        _id
        dateFrom
        dateTo
        discount
        code
      }
    }
  }
`;
