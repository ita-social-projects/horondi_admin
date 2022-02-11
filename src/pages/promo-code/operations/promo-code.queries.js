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
        categories
      }
    }
  }
`;

export const getPromoCodeById = gql`
  query GET($id: ID!) {
    getPromoCodeById(id: $id) {
      ... on PromoCode {
        _id
        code
        dateFrom
        dateTo
        discount
        categories
      }
      ... on Error {
        message
        statusCode
      }
    }
  }
`;
