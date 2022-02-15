import { gql } from '@apollo/client';

export const getAllCertificates = gql`
  query ($skip: Int, $limit: Int) {
    getAllCertificates(skip: $skip, limit: $limit) {
      __typename
      ... on PaginatedCertificate {
        items {
          _id
          name
          value
          createdBy {
            _id
          }
          isUsed
          isActivated
          isExpired
          dateStart
          dateEnd
        }
      }
    }
  }
`;
