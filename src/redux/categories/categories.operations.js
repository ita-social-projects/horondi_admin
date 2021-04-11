import { gql } from '@apollo/client';
import { client, setItems } from '../../utils/client';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { categoryTranslations } from '../../translations/category.translations';

export const getAllCategories = async (filter, pagination, sort) => {
  const result = await client.query({
    query: gql`
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
    `,
    variables: {
      filter,
      pagination,
      sort
    }
  });
  return result.data.getAllCategories;
};

export const getCategoryById = async (id) => {
  const result = await client.query({
    variables: { id },
    query: gql`
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
    `,
    fetchPolicy: 'no-cache'
  });

  if (result.data.getCategoryById.message) {
    throw new Error(
      `${result.data.getCategoryById.statusCode} ${
        categoryTranslations[result.data.getCategoryById.message]
      }`
    );
  }

  return result.data.getCategoryById;
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

export const createCategory = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const result = await client.mutate({
    context: { headers: { token } },
    variables: payload,

    mutation: gql`
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
    `,
    fetchPolicy: 'no-cache'
  });

  if (result.data.addCategory.message) {
    throw new Error(
      `${result.data.addCategory.statusCode} ${
        categoryTranslations[result.data.addCategory.message]
      }`
    );
  }
  client.resetStore();
  return result.data.addCategory;
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
