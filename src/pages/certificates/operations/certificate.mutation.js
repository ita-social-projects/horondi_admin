import { gql } from '@apollo/client';

export const bulkGenerateCertificates = gql`
  mutation (
    $newCertificates: [GenerateCertificateInput]!
    $email: String
    $dateStart: Date
  ) {
    generateCertificate(
      newCertificates: $newCertificates
      email: $email
      dateStart: $dateStart
    ) {
      ... on Certificates {
        certificates {
          name
          value
          dateStart
          dateEnd
        }
      }
    }
  }
`;
