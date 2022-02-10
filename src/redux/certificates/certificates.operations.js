import { getItems } from '../../utils/client';

export const getAllCertificates = async () => {
  const query = `
    query {
      getAllCertificates {
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
        }
      } 
    }
  `;

  const result = await getItems(query);

  return result?.data?.getAllCertificates;
};
