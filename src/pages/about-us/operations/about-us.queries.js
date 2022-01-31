import { gql } from '@apollo/client';

export const getAllBlocks = gql`
  query {
    getAllBlocks {
      id
      title
      text
      image
    }
  }
`;
