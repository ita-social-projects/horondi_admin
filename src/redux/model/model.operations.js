import { gql } from '@apollo/client';
import { client } from '../../utils/client';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { patternTranslations } from '../../translations/pattern.translations';

export const getAllModels = async (skip, limit) => {
  const result = await client.query({
    variables: {
      skip,
      limit
    },
    query: gql`
      query($skip: Int, $limit: Int) {
        getAllModels(skip: $skip, limit: $limit) {
          items {
            _id
            name {
              lang
              value
            }
            category {
              name {
                value
                lang
              }
            }
            images {
              large
              medium
              small
              thumbnail
            }
            priority
            subcategory {
              name {
                value
                lang
              }
            }
            show
            description {
              value
              lang
            }
          }
          count
        }
      }
    `
  });
  client.resetStore();

  return result.data.getAllModels;
};

export const getModelById = async (id) => {
  const result = await client.query({
    variables: { id },
    query: gql`
      query($id: ID!) {
        getModelById(id: $id) {
          ... on Model {
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
  const { data } = result;
  if (data.getModelById.message) {
    throw new Error(
      `${data.getModelById.statusCode} ${
        patternTranslations[data.getModelById.message]
      }`
    );
  }

  return data.getModelById;
};

export const deleteModel = async (id) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

  const result = await client.mutate({
    variables: { id },
    context: { headers: { token } },
    mutation: gql`
      mutation($id: ID!) {
        deleteModel(id: $id) {
          ... on Model {
            _id
            name {
              lang
              value
            }
            material
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
  client.resetStore();
  const { data } = result;

  if (data.deleteModel.message) {
    throw new Error(
      `${data.deleteModel.statusCode} ${
        patternTranslations[data.deleteModel.message]
      }`
    );
  }

  return data.deleteModel;
};

export const createModel = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

  const result = await client.mutate({
    context: { headers: { token } },
    variables: payload,

    mutation: gql`
      mutation($pattern: ModelInput!, $image: Upload!) {
        addModel(pattern: $pattern, image: $image) {
          ... on Model {
            _id
            name {
              lang
              value
            }
            material
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
  client.resetStore();
  const { data } = result;

  if (data.addModel.message) {
    throw new Error(
      `${data.addModel.statusCode} ${
        patternTranslations[data.addModel.message]
      }`
    );
  }

  return data.addModel;
};

export const updateModel = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

  const { id, pattern, image } = payload;
  const result = await client.mutate({
    context: { headers: { token } },
    variables: { id, pattern, image },
    mutation: gql`
      mutation($id: ID!, $pattern: ModelInput!, $image: Upload!) {
        updateModel(id: $id, pattern: $pattern, image: $image) {
          ... on Model {
            _id
            name {
              lang
              value
            }
            material
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
  client.resetStore();
  const { data } = result;

  if (data.updateModel.message) {
    throw new Error(
      `${data.updateModel.statusCode} ${
        patternTranslations[data.updateModel.message]
      }`
    );
  }

  return data.updateModel;
};
