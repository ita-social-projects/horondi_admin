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

export const deleteCertificateById = gql`
  mutation ($id: ID!) {
    deleteCertificate(id: $id) {
      ... on Certificate {
        _id
      }
    }
  }
`;

export const updateCertificateByName = gql`
  mutation ($name: String!) {
    updateCertificate(name: $name) {
      ... on Certificate {
        name
      }
    }
  }
`;
