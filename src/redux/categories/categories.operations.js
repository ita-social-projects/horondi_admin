import { gql } from '@apollo/client';
import { getItems, setItems, client } from '../../utils/client';

export const getCategoryById = async (id) => {
  const result = await client.query({
    variables: { id },
    query: gql`
      query getCategoryById($id: ID) {
        getCategoryById(id: $id) {
          ... on Category {
            _id
            code
            name {
              lang
              value
            }
            images {
              large
              medium
              small
              thumbnail
            }
            subcategories
            isMain
            available
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  const { data } = result;
  return data.getCategoryById;
};

export const getAllCategories = async () => {
  const result = await client.query({
    query: gql`
      query {
        getAllCategories {
          _id
          code
          name {
            lang
            value
          }
          images {
            large
            medium
            small
            thumbnail
          }
          subcategories
          isMain
          available
        }
      }
    `
  });
  client.resetStore();
  const { data } = result;
  return data.getAllCategories;
};

export const createCategory = (data) => {
  const query = `
        mutation addCategory($category: CategoryInput!, $parentId: ID, $upload: Upload) {
    addCategory(category: $category, parentId: $parentId, upload: $upload) {
      ... on Category {
        _id
        code
      }
      ... on Error {
        statusCode
        message
      }
    }
  },
  `;
  return setItems(query, data);
};

export const updateCategoryById = (data) => {
  const query = `
    mutation updateCategory($id: ID!, $category: CategoryInput!, $upload: Upload){
      updateCategory(id: $id, category: $category, upload: $upload) {
        ... on Category {
          _id
          code
          available
        }
        ... on Error {
          statusCode
          message
        }
      }
    }
  `;
  return setItems(query, data);
};

export const deleteCategoryById = (deleteId, switchId) => {
  const query = `
        mutation deleteCategory($deleteId: ID!, $switchId: ID!){
      deleteCategory(
      deleteId: $deleteId
      switchId: $switchId
      ) {
        ... on Category {
          _id
          code
        }
        ... on Error {
          statusCode
          message
        }
      }
    }
  `;
  return setItems(query, { deleteId, switchId });
};

export const getSubcategories = async ({ id }) => {
  const result = await client.query({
    query: gql`
      query getSubcategories($id: ID!) {
        getSubcategories(id: $id) {
          _id
          code
          name {
            lang
            value
          }
          images {
            large
            medium
            small
            thumbnail
          }
          subcategories
          isMain
          available
        }
      }
    `,
    variables: {
      id
    }
  });
  client.resetStore();
  const { data } = result;
  return data.getSubcategories;
};
