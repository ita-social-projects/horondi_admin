import { gql } from '@apollo/client';

export const getAllCertificates = gql`
  query {
    getAllCertificates {
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
          dateStart
          dateEnd
        }
      }
    }
  }
`;
