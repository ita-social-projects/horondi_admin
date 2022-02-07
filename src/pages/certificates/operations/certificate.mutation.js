import { gql } from '@apollo/client';

export const bulkGenerateCertificates = gql`
  mutation ($generate: BulkCertificateInput) {
    bulkGenerateCertificates(generate: $generate) {
      ... on CertificateArray {
        items {
          name
          value
          dateStart
          dateEnd
        }
      }
    }
  }
`;
