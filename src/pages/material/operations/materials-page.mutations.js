import { gql } from '@apollo/client';

export const DELETE_MATERIALS_BLOCK = gql`
  mutation ($id: ID!) {
    deleteMaterialsBlock(id: $id) {
      ... on MaterialsBlock {
        _id
      }
    }
  }
`;
