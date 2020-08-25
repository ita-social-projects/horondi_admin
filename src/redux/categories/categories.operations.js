import { getItems, setItems } from '../../utils/client';

export const getCategoryById = (id) => {
  const query = `
    query getCategoryById($id: ID){
  getCategoryById(id: $id) {
    ... on Category {
      _id
      code
      name{
        lang
        value
      }
      images{
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
  `;
  return getItems(query, { id });
};

export const getAllCategories = () => {
  const query = `
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
  `;
  return getItems(query);
};

export const createCategory = (data) => {
  const query = `
        mutation addCategory($category: CategoryInput!, $parentId: ID) {
    addCategory(category: $category, parentId: $parentId) {
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
  return setItems(query, data);
};

export const updateCategoryById = (data) => {
  const query = `
    mutation updateCategory($id: ID!, $category: CategoryInput!){
      updateCategory(id: $id, category: $category) {
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

export const deleteCategoryById = (data) => {
  const query = `
        mutation deleteCategory($id: ID!){
      deleteCategory(id: $id) {
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
  return setItems(query, data);
};
