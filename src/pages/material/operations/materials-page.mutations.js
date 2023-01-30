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

export const UPDATE_MATERIALS_BLOCK = gql`
  mutation ($id: ID!, $materialsBlock: MaterialsBlockInput!, $image: Upload) {
    updateMaterialsBlock(
      id: $id
      materialsBlock: $materialsBlock
      image: $image
    ) {
      ... on MaterialsBlock {
        _id
        title
        type
        text {
          lang
          value
        }
      }
    }
  }
`;
