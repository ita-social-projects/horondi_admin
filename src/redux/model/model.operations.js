import { getItems, setItems } from '../../utils/client';
import { modelTranslations } from '../../translations/model.translations';

const constructorElementRequest = `
    _id
    available
    customizable
    basePrice {
     value
     currency
    }
    name {
     value
     lang
    }
    features {
      material{
        _id
        name {
          value
          lang
        }
      }
      color {
         _id
        colorHex
        name {
          value
          lang
      }
      }
    }
`;

export const getAllModels = async (filter, pagination) => {
  const getAllModelsQuery = `
      query($filter: ModelFilterInput, $pagination: Pagination) {
        getAllModels(filter: $filter, pagination: $pagination) {
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
    `;

  const result = await getItems(getAllModelsQuery, { filter, pagination });

  return result?.data?.getAllModels;
};

export const getModelById = async (id) => {
  const getModelByIdQuery = `
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
          sizes {
            _id
            name
            simpleName {
              lang
              value
            }
            available
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
          eligibleOptions {
            constructorBasic {
              ${constructorElementRequest}
            }
            constructorPattern {
              _id
              name {
                value
                lang
              }
              images {
                large
                medium
                small
                thumbnail
              }
              features {
                material {
                  _id
                  name {
                    value
                    lang
                  }
                }
                handmade 
              }
            }
            constructorFrontPocket  {
              ${constructorElementRequest}
            }
            constructorBottom{
              ${constructorElementRequest}
            }
          }
          
        }
        ... on Error {
          message
          statusCode
        }
      }
    }
    `;
  const result = await getItems(getModelByIdQuery, { id });

  if (
    Object.keys(modelTranslations).includes(result?.data?.getModelById?.message)
  ) {
    throw new Error(
      `${result.data.getModelById.statusCode} ${
        modelTranslations[result.data.getModelById.message]
      }`
    );
  }

  return result?.data?.getModelById;
};

export const deleteModel = async (id) => {
  const deleteModelMutation = `
      mutation($id: ID!) {
        deleteModel(id: $id) {
          ... on Model {
            _id
            eligibleOptions {
              constructorBasic {
                _id
              }
              constructorPattern {
                _id
              }
              constructorFrontPocket {
                _id
              }
              constructorBottom {
                _id
              }
            }
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await setItems(deleteModelMutation, { id });

  return result?.data?.deleteModel;
};

export const createModel = async (payload) => {
  const addMutation = `
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
    `;

  const result = await setItems(addMutation, payload);

  if (
    Object.keys(modelTranslations).includes(result?.data?.addModel?.message)
  ) {
    throw new Error(
      `${result.data.addModel.statusCode} ${
        modelTranslations[result.data.addModel.message]
      }`
    );
  }

  return result?.data?.addModel;
};

export const updateModel = async (payload) => {
  const updateMutation = `
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
    `;

  const result = await setItems(updateMutation, payload);

  if (
    Object.keys(modelTranslations).includes(result?.data?.updateModel?.message)
  ) {
    throw new Error(
      `${result.data.updateModel.statusCode} ${
        modelTranslations[result.data.updateModel.message]
      }`
    );
  }

  return result?.data?.updateModel;
};

export const addModelConstructorBasic = async (payload) => {
  const query = `
      mutation($id: ID!, $constructorElementID: ID!) {
        addModelConstructorBasic(
          id: $id
          constructorElementID: $constructorElementID
        ) {
          ... on Model {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await setItems(query, payload);

  if (
    Object.keys(modelTranslations).includes(
      result?.data?.addModelConstructorBasic?.message
    )
  ) {
    throw new Error(
      `${result.data.addModelConstructorBasic.statusCode} ${
        modelTranslations[result.data.addModelConstructorBasic.message]
      }`
    );
  }

  return result?.data?.addModelConstructorBasic;
};

export const deleteModelConstructorBasic = async (payload) => {
  const query = `
      mutation($id: ID!, $constructorElementID: ID!) {
        deleteModelConstructorBasic(
          id: $id
          constructorElementID: $constructorElementID
        ) {
          ... on Model {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await setItems(query, payload);

  return result?.data?.deleteModelConstructorBasic;
};

export const addModelConstructorPattern = async (payload) => {
  const query = `
      mutation($id: ID!, $constructorElementID: ID!) {
        addModelConstructorPattern(
          id: $id
          constructorElementID: $constructorElementID
        ) {
          ... on Model {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await setItems(query, payload);

  if (
    Object.keys(modelTranslations).includes(
      result?.data?.addModelConstructorPattern?.message
    )
  ) {
    throw new Error(
      `${result.data.addModelConstructorPattern.statusCode} ${
        modelTranslations[result.data.addModelConstructorPattern.message]
      }`
    );
  }
  return result?.data?.addModelConstructorPattern;
};

export const deleteModelConstructorPattern = async (payload) => {
  const query = `
      mutation($id: ID!, $constructorElementID: ID!) {
        deleteModelConstructorPattern(
          id: $id
          constructorElementID: $constructorElementID
        ) {
          ... on Model {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await setItems(query, payload);

  return result?.data?.deleteModelConstructorPattern;
};

export const addModelConstructorFrontPocket = async (payload) => {
  const query = `
      mutation($id: ID!, $constructorElementID: ID!) {
        addModelConstructorFrontPocket(
          id: $id
          constructorElementID: $constructorElementID
        ) {
          ... on Model {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await setItems(query, payload);

  if (
    Object.keys(modelTranslations).includes(
      result?.data?.addModelConstructorFrontPocket?.message
    )
  ) {
    throw new Error(
      `${result.data.addModelConstructorFrontPocket.statusCode} ${
        modelTranslations[result.data.addModelConstructorFrontPocket.message]
      }`
    );
  }

  return result?.data?.addModelConstructorFrontPocket;
};

export const deleteModelConstructorFrontPocket = async (payload) => {
  const query = `
      mutation($id: ID!, $constructorElementID: ID!) {
        deleteModelConstructorFrontPocket(
          id: $id
          constructorElementID: $constructorElementID
        ) {
          ... on Model {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await setItems(query, payload);

  return result?.data?.deleteModelConstructorFrontPocket;
};

export const addModelConstructorBottom = async (payload) => {
  const query = `
      mutation($id: ID!, $constructorElementID: ID!) {
        addModelConstructorBottom(
          id: $id
          constructorElementID: $constructorElementID
        ) {
          ... on Model {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await setItems(query, payload);

  if (
    Object.keys(modelTranslations).includes(
      result?.data?.addModelConstructorBottom?.message
    )
  ) {
    throw new Error(
      `${result.data.addModelConstructorBottom.statusCode} ${
        modelTranslations[result.data.addModelConstructorBottom.message]
      }`
    );
  }

  return result?.data?.addModelConstructorBottom;
};

export const deleteModelConstructorBottom = async (payload) => {
  const query = `
      mutation($id: ID!, $constructorElementID: ID!) {
        deleteModelConstructorBottom(
          id: $id
          constructorElementID: $constructorElementID
        ) {
          ... on Model {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await setItems(query, payload);

  return result?.data?.deleteModelConstructorBottom;
};
