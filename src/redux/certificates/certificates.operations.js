import { getItems, setItems } from '../../utils/client';

export const getAllCertificates = async (skip, limit) => {
  const query = `
    query($limit: Int, $skip: Int) {
      getAllCertificates(limit: $limit, skip: $skip) {
        items {
          _id
          isUsed
          isActive
          dateStart
          dateEnd
          name
          value
          createdBy
        }
        count
      } 
    }
  `;

  const result = await getItems(query, {
    skip,
    limit
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
