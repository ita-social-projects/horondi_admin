import { gql } from '@apollo/client';

export const GET_ALL_MATERIALS_BLOCKS = gql`
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
