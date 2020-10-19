import { gql } from '@apollo/client';
import { client } from '../../utils/client';

const getAllNews = async (skip, limit) => {
  const result = await client.query({
    variables: {
      skip,
      limit
    },
    query: gql`
    
    `
  });
};