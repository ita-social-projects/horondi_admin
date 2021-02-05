import { gql } from '@apollo/client';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { client } from '../../utils/client';

export const createSize = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const result = await client.mutate({
    context: { headers: { token } },
    variables: { size: payload },

    mutation: gql`
      mutation($size: SizeInput!) {
        addSize(size: $size) {
          ... on Size {
            _id
            name
            heightInCm
            widthInCm
            depthInCm
            volumeInLiters
            weightInKg
            available
            additionalPrice {
              value
              currency
            }
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();
  const { data } = result;

  if (data.addSize.message) {
    throw new Error(`${data.addSize.statusCode} ${data.addSize.message}`);
  }
  return data.addSize;
};
