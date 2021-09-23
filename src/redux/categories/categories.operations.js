import { getItems, setItems } from '../../utils/client';
import { categoryErrors } from '../../configs/error-modal-messages';

export const getAllCategories = async (filter, pagination, sort) => {
  const getAllCategoriesQuery = `
      query(
        $filter: FilterInputComponent
        $pagination: Pagination
        $sort: SortInputComponent
      ) {
        getAllCategories(
          filter: $filter
          pagination: $pagination
          sort: $sort
        ) {
          items {
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
            available
          }
          count
        }
      }
    `;

  const result = await getItems(getAllCategoriesQuery, {
    filter,
    pagination,
    sort
  });

  return result?.data?.getAllCategories;
};
export const getCategoryById = async (id) => {
  const getCategoryByIdQuery = `
      query($id: ID!) {
        getCategoryById(id: $id) {
          ... on Category {
            _id
            name {
              lang
              value
            }
            code
            images {
              thumbnail
            }
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await getItems(getCategoryByIdQuery, { id });

  if (
    Object.keys(categoryErrors).includes(result?.data?.getCategoryById?.message)
  ) {
    throw new Error(
      `${result.data.getCategoryById.statusCode} ${
        categoryErrors[result.data.getCategoryById.message]
      }`
    );
  }

  return result?.data?.getCategoryById;
};
export const deleteCategoryById = async (deleteId, switchId) => {
  const deleteCategoryByIdQuery = `
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

  const result = await setItems(deleteCategoryByIdQuery, {
    deleteId,
    switchId
  });

  return result?.data?.deleteCategory;
};
export const createCategory = async (payload) => {
  const query = `
      mutation($category: CategoryInput!, $upload: Upload!) {
        addCategory(category: $category, upload: $upload) {
          ... on Category {
            _id
          }
          ... on Error {
            statusCode
            message
          }
        }
      }
    `;
  const result = await setItems(query, payload);

  if (
    Object.keys(categoryErrors).includes(result?.data?.addCategory?.message)
  ) {
    throw new Error(
      `${result.data.addCategory.statusCode} ${
        categoryErrors[result.data.addCategory.message]
      }`
    );
  }
  return result?.data?.addCategory;
};
export const updateCategory = async (payload) => {
  const query = `
      mutation updateCategory(
        $id: ID!
        $category: CategoryInput!
        $upload: Upload
      ) {
        updateCategory(id: $id, category: $category, upload: $upload) {
          ... on Category {
            _id
          }
          ... on Error {
            statusCode
            message
          }
        }
      }
    `;
  const result = await setItems(query, payload);

  if (
    Object.keys(categoryErrors).includes(result?.data?.updateCategory?.message)
  ) {
    throw new Error(
      `${result.data.updateCategory.statusCode} ${
        categoryErrors[result.data.updateCategory.message]
      }`
    );
  }
  return result?.data?.updateCategory;
};
