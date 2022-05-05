import { gql } from '@apollo/client';

export const getAllPromoCodes = gql`
  query query(
    $skip: Int
    $limit: Int
    $sortBy: String
    $sortOrder: Sort
    $search: String
    $status: [String]
  ) {
    getAllPromoCodes(
      skip: $skip
      limit: $limit
      sortBy: $sortBy
      sortOrder: $sortOrder
      search: $search
      status: $status
    ) {
      __typename
      ... on PaginatedPromoCode {
        items {
          _id
          dateFrom
          dateTo
          discount
          code
          categories
        }
        count
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
