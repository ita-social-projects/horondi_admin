import { gql } from '@apollo/client';
import { client, getItems, setItems } from '../../utils/client';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { categoryTranslations } from '../../translations/category.translations';
import { AUTH_ERRORS } from '../../error-messages/auth';

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

  const { data } = await getItems(getAllCategoriesQuery, {
    filter,
    pagination,
    sort
  });

  return data.getAllCategories;
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

  const { data } = await getItems(getCategoryByIdQuery, { id });

  if (data.getCategoryById.message) {
    throw new Error(
      `${data.getCategoryById.statusCode} ${
        categoryTranslations[data.getCategoryById.message]
      }`
    );
  }

  return data.getCategoryById;
};

export const deleteCategoryById = (deleteId, switchId) => {
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

  const { data } = setItems(deleteCategoryByIdQuery, { deleteId, switchId });

  return data.deleteCategory;
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
  const { data } = await setItems(query, payload);

  if (
    data.addCategory.message &&
    data.addCategory.message !== AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID
  ) {
    throw new Error(
      `${data.addCategory.statusCode} ${
        categoryTranslations[data.addCategory.message]
      }`
    );
  }
  return data.addCategory;
};
export const updateCategory = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

  const result = await client.mutate({
    context: { headers: { token } },
    variables: payload,
    mutation: gql`
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
    `,
    fetchPolicy: 'no-cache'
  });
  if (result.data.updateCategory.message) {
    throw new Error(
      `${result.data.updateCategory.statusCode} ${
        categoryTranslations[result.data.updateCategory.message]
      }`
    );
  }
  client.resetStore();
  return result.data.updateCategory;
};
