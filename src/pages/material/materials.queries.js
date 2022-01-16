import { gql } from '@apollo/client';

export const getAllMaterialsBlocks = gql`
  query {
    getAllMaterialsBlocks {
      id
      heading
      title
      text
      image
    }
  }
`;
