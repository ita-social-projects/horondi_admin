import { gql } from '@apollo/client';

export const GET_ALL_MATERIALS_BLOCKS = gql`
  query {
    getAllMaterialsBlocks(skip: 0, limit: 0) {
      items {
        _id
        title
        type
        image {
          thumbnail
        }
        text {
          lang
          value
        }
        translationsKey
      }
      count
    }
  }
`;

export const GET_MATERIALS_BLOCKS_BY_TYPE = gql`
  query ($type: String!, $skip: Int!, $limit: Int!) {
    getMaterialsBlocksByType(type: $type, skip: $skip, limit: $limit) {
      items {
        _id
        title
        type
        image {
          thumbnail
        }
        text {
          lang
          value
        }
        translationsKey
      }
      count
    }
  }
`;

export const GET_MATERIALS_BLOCK_BY_ID = gql`
  query ($id: ID!) {
    getMaterialsBlockById(id: $id) {
      ... on MaterialsBlock {
        _id
        title
        type
        text {
          lang
          value
        }
        image {
          small
        }
        translationsKey
      }
    }
  }
`;
