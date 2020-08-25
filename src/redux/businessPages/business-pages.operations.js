import { gql } from 'apollo-boost';
import { client } from '../../utils/client';

const getAllBusinessPages = async () => {
  const result = await client.query({
    query: gql`
      query {
        getAllBusinessTexts {
          _id
          code
          title {
            value
          }
          text {
            value
          }
        }
      }
    `
  });
  client.resetStore();
  const { data } = result;
  return data.getAllBusinessTexts;
};

export { getAllBusinessPages };
