import { gql } from '@apollo/client';
import { client } from '../../utils/client';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { modelTranslations } from '../../translations/model.translations';

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
              lang
              value
            }
            category {
              _id
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
            show
            description {
              value
              lang
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
        modelTranslations[data.getModelById.message]
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
            show
            description {
              value
              lang
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
  const { data } = result;

  if (data.deleteModel.message) {
    throw new Error(
      `${data.deleteModel.statusCode} ${
        modelTranslations[data.deleteModel.message]
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
      mutation($model: ModelInput!, $image: Upload) {
        addModel(model: $model, upload: $image) {
          ... on Model {
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
            show
            description {
              value
              lang
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
  const { data } = result;

  if (data.addModel.message) {
    throw new Error(
      `${data.addModel.statusCode} ${modelTranslations[data.addModel.message]}`
    );
  }

  return data.addModel;
};

export const updateModel = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  console.log(payload);
  const { id, model, image } = payload;
  const result = await client.mutate({
    context: { headers: { token } },
    variables: { id, model, image },
    mutation: gql`
      mutation($id: ID!, $model: ModelInput!, $image: Upload) {
        updateModel(id: $id, model: $model, upload: $image) {
          ... on Model {
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
            show
            description {
              value
              lang
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
  const { data } = result;
  if (data.updateModel.message) {
    throw new Error(
      `${data.updateModel.statusCode} ${
        modelTranslations[data.updateModel.message]
      }`
    );
  }

  return data.updateModel;
};
