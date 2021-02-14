import { gql } from '@apollo/client';
import { client } from '../../utils/client';

export const getAllSizes = async () => {
  const result = await client.query({
    query: gql`
      query {
        getAllSizes {
          _id
          name
          heightInCm
          widthInCm
          depthInCm
          volumeInLiters
          weightInKg
          available
        }
      }
    `
  });
  return result.data.getAllSizes;
};
