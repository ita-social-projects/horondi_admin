import { gql } from '@apollo/client';

export const getAllCertificates = gql`
  query (
    $skip: Int
    $limit: Int
    $sortOrder: Sort
    $search: String
    $sortBy: String
    $status: [String]
  ) {
    getAllCertificates(
      skip: $skip
      limit: $limit
      sortOrder: $sortOrder
      search: $search
      sortBy: $sortBy
      status: $status
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
          inProgress
          dateStart
          dateEnd
          dateOfUsing
        }
        count
      }
    }
  }
`;

export const getCertificatebyId = gql`
  query ($id: ID!) {
    getCertificateById(id: $id) {
      ... on Certificate {
        name
        value
      }
      ... on Error {
        message
        statusCode
      }
    }
  }
`;
