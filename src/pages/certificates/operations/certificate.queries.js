import { gql } from '@apollo/client';

export const getAllCertificates = gql`
  query (
    $skip: Int
    $limit: Int
    $sortOrder: Sort
    $search: String
    $sortBy: String
  ) {
    getAllCertificates(
      skip: $skip
      limit: $limit
      sortOrder: $sortOrder
      search: $search
      sortBy: $sortBy
    ) {
      __typename
      ... on PaginatedCertificate {
        items {
          _id
          name
          value
          admin {
            firstName
            lastName
          }
          isUsed
          isActivated
          isExpired
          dateStart
          dateEnd
        }
        count
      }
    }
  }
`;
