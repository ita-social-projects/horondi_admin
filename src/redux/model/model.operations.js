import { gql } from '@apollo/client';
import { client } from '../../utils/client';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { modelTranslations } from '../../translations/model.translations';

const constructorElementRequest = `
  _id
  available
  default
  basePrice{
   value
   currency
  }
  name {
   value
   lang
  }
  image
  material{
    _id
  name {
    value
    lang
  }
  }
  color{
     _id
    colorHex
    name {
    value
    lang
  }
  }
`;

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
  await client.resetStore();
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
                    availableForConstructor
                    description {
                        value
                        lang
                    }
                    constructorBasic{
                        ${constructorElementRequest}
                    }
                    constructorPattern{
                        _id
                        name {
                            value
                            lang
                        }
                        material
                        constructorImg
                        images {
                            thumbnail
                        }
                        available
                    }
                    constructorFrontPocket{
                        ${constructorElementRequest}
                    }
                    constructorBottom{
                        ${constructorElementRequest}
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
  await client.resetStore();
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
                    constructorBasic{
                        _id
                    }
                    constructorPattern{
                        _id
                    }
                    constructorFrontPocket{
                        _id
                    }
                    constructorBottom{
                        _id
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

export const addModelConstructorBasic = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const { id, constructorElementID } = payload
  const result = await client.mutate({
    context: { headers: { token } },
    variables: { id, constructorElementID },
    mutation: gql`
        mutation($id:ID!, $constructorElementID:ID!) {
            addModelConstructorBasic(id:$id, constructorElementID:$constructorElementID) {
                ... on Model {
                    _id
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
  await client.resetStore();
  const { data } = result;

  if (data.addModelConstructorBasic.message) {
    throw new Error(
      `${data.addModelConstructorBasic.statusCode} ${
        modelTranslations[data.addModelConstructorBasic.message]
      }`
    );
  }
  return data.addModelConstructorBasic;
};

export const deleteModelConstructorBasic = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const { id, constructorElementID } = payload
  const result = await client.mutate({
    context: { headers: { token } },
    variables: { id, constructorElementID },
    mutation: gql`
        mutation($id:ID!, $constructorElementID:ID!) {
            deleteModelConstructorBasic(id:$id, constructorElementID:$constructorElementID) {
                ... on Model {
                    _id
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
  await client.resetStore();
  const { data } = result;

  if (data.deleteModelConstructorBasic.message) {
    throw new Error(
      `${data.deleteModelConstructorBasic.statusCode} ${
        modelTranslations[data.deleteModelConstructorBasic.message]
      }`
    );
  }
  return data.deleteModelConstructorBasic;
};

export const addModelConstructorPattern = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const { id, constructorElementID } = payload
  const result = await client.mutate({
    context: { headers: { token } },
    variables: { id, constructorElementID },
    mutation: gql`
        mutation($id:ID!, $constructorElementID:ID!) {
            addModelConstructorPattern(id:$id, constructorElementID:$constructorElementID) {
                ... on Model {
                    _id
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
  await client.resetStore();
  const { data } = result;

  if (data.addModelConstructorPattern.message) {
    throw new Error(
      `${data.addModelConstructorPattern.statusCode} ${
        modelTranslations[data.addModelConstructorPattern.message]
      }`
    );
  }
  return data.addModelConstructorPattern;
};

export const deleteModelConstructorPattern = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const { id, constructorElementID } = payload
  const result = await client.mutate({
    context: { headers: { token } },
    variables: { id, constructorElementID },
    mutation: gql`
        mutation($id:ID!, $constructorElementID:ID!) {
            deleteModelConstructorPattern(id:$id, constructorElementID:$constructorElementID) {
                ... on Model {
                    _id
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
  await client.resetStore();
  const { data } = result;

  if (data.deleteModelConstructorPattern.message) {
    throw new Error(
      `${data.deleteModelConstructorPattern.statusCode} ${
        modelTranslations[data.deleteModelConstructorPattern.message]
      }`
    );
  }
  return data.deleteModelConstructorPattern;
};

export const addModelConstructorFrontPocket = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const { id, constructorElementID } = payload
  const result = await client.mutate({
    context: { headers: { token } },
    variables: { id, constructorElementID },
    mutation: gql`
        mutation($id:ID!, $constructorElementID:ID!) {
            addModelConstructorFrontPocket(id:$id, constructorElementID:$constructorElementID) {
                ... on Model {
                    _id
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
  await client.resetStore();
  const { data } = result;

  if (data.addModelConstructorFrontPocket.message) {
    throw new Error(
      `${data.addModelConstructorFrontPocket.statusCode} ${
        modelTranslations[data.addModelConstructorFrontPocket.message]
      }`
    );
  }
  return data.addModelConstructorFrontPocket;
};

export const deleteModelConstructorFrontPocket = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const { id, constructorElementID } = payload
  const result = await client.mutate({
    context: { headers: { token } },
    variables: { id, constructorElementID },
    mutation: gql`
        mutation($id:ID!, $constructorElementID:ID!) {
            deleteModelConstructorFrontPocket(id:$id, constructorElementID:$constructorElementID) {
                ... on Model {
                    _id
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
  await client.resetStore();
  const { data } = result;

  if (data.deleteModelConstructorFrontPocket.message) {
    throw new Error(
      `${data.deleteModelConstructorFrontPocket.statusCode} ${
        modelTranslations[data.deleteModelConstructorFrontPocket.message]
      }`
    );
  }
  return data.deleteModelConstructorFrontPocket;
};

export const addModelConstructorBottom = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const { id, constructorElementID } = payload
  const result = await client.mutate({
    context: { headers: { token } },
    variables: { id, constructorElementID },
    mutation: gql`
        mutation($id:ID!, $constructorElementID:ID!) {
            addModelConstructorBottom(id:$id, constructorElementID:$constructorElementID) {
                ... on Model {
                    _id
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
  await client.resetStore();
  const { data } = result;

  if (data.addModelConstructorBottom.message) {
    throw new Error(
      `${data.addModelConstructorBottom.statusCode} ${
        modelTranslations[data.addModelConstructorBottom.message]
      }`
    );
  }
  return data.addModelConstructorBottom;
};

export const deleteModelConstructorBottom = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const { id, constructorElementID } = payload
  const result = await client.mutate({
    context: { headers: { token } },
    variables: { id, constructorElementID },
    mutation: gql`
        mutation($id:ID!, $constructorElementID:ID!) {
            deleteModelConstructorBottom(id:$id, constructorElementID:$constructorElementID) {
                ... on Model {
                    _id
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
  await client.resetStore();
  const { data } = result;

  if (data.deleteModelConstructorBottom.message) {
    throw new Error(
      `${data.deleteModelConstructorBottom.statusCode} ${
        modelTranslations[data.deleteModelConstructorBottom.message]
      }`
    );
  }
  return data.deleteModelConstructorBottom;
};
