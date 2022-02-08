import { getItems, setItems } from '../../utils/client';

export const getAllCertificates = async (skip, limit, filter) => {
  const query = `
    query($skip: Int, $limit: Int, $filter: CertificateFilterInput) {
      getAllCertificates(skip: $skip, limit: $limit, filter: $filter) {
        ... on PaginatedCertificate {
          items {
          _id
          isUsed
          isActivated
          dateStart
          dateEnd
          name
          value
          createdBy {
            _id
          }
        }
        count  
        }
      } 
    }
  `;

  const result = await getItems(query, {
    skip,
    limit,
    filter
  });

  return result?.data?.getAllCertificates;
};

export const deleteCertificate = async (id) => {
  const query = `
    mutation($id: ID!) {
      deleteCertificate(id: $id) {
        ... on Certificate {
            _id
        }
        ... on Error {
            statusCode
            message
        }
      }
    }
  `;

  const result = await setItems(query, { id });

  return result?.data?.deleteCertificate;
};
