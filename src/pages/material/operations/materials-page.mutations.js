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

export const ADD_MATERIALS_BLOCK = gql`
  mutation ($materialsBlock: MaterialsBlockInput!, $image: Upload!) {
    addMaterialsBlock(materialsBlock: $materialsBlock, image: $image) {
      ... on MaterialsBlock {
        _id
        text {
          lang
          value
        }
        title
        type
      }
    }
  }
`;
