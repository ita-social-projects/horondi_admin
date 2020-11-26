import { gql } from '@apollo/client';
import { client } from '../../utils/client';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { categoryTranslations } from '../../translations/category.translations';

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
    isMain
    available
          }
        }
    `
  });
  client.resetStore();

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
              value
            }
            description {
              value
            }
            material
            handmade
            available
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
      `${result.data.getCategoryById.statusCode} ${categoryTranslations[result.data.getCategoryById.message]
      }`
    );
  }

  return result.data.getCategoryById;
};

export const deleteCategory = async (id) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

  const result = await client.mutate({
    variables: { id },
    context: { headers: { token } },
    mutation: gql`
    mutation deleteCategory($id: ID!){
  deleteCategory(
  id: $id
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
`,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();

  if (result.data.deleteCategory.message) {
    throw new Error(
      `${result.data.deleteCategory.statusCode} ${categoryTranslations[result.data.deleteCategory.message]
      }`
    );
  }

  return result.data.deleteCategory;
};

export const createCategory = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
console.log(payload);
  const result = await client.mutate({
    context: { headers: { token } },
    variables: payload,

    mutation: gql`
      mutation($category: CategoryInput!, $upload: Upload!) {
        addCategory(category: $category, upload: $upload) {
          ... on Category {
            _id
            name {
              lang
              value
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
  client.resetStore();

  if (result.data.addCategory.message) {
    throw new Error(
      `${result.data.addCategory.statusCode} ${categoryTranslations[result.data.addCategory.message]
      }`
    );
  }

  return result.data.addCategory;
};

export const updateCategory = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

  const result = await client.mutate({
    context: { headers: { token } },
    variables: payload,
    mutation: gql`
    mutation updateCategory($id: ID!, $category: CategoryInput!, $upload: Upload){
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
  client.resetStore();

  if (result.data.updateCategory.message) {
    throw new Error(
      `${result.data.updateCategory.statusCode} ${categoryTranslations[result.data.updateCategory.message]
      }`
    );
  }

  return result.data.updateCategory;
};
