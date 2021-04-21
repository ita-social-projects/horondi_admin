import { getItems, setItems } from '../../utils/client';
import { sizeTranslations } from '../../translations/sizes.translations';

export const getAllSizes = async () => {
  const query = `
      query {
        getAllSizes {
          _id
          name
          simpleName {
            lang
            value
          }
          available
        }
      }
    `;

  const { data } = await getItems(query);

  return data.getAllSizes;
};

export const getSizeById = async (id) => {
  const query = `
      query($id: ID!) {
        getSizeById(id: $id) {
          ... on Size {
            name
            simpleName {
              lang
              value
            }
            heightInCm
            widthInCm
            depthInCm
            volumeInLiters
            weightInKg
            available
            additionalPrice {
              currency
              value
            }
          }
        }
      }
    `;

  const { data } = await getItems(query, { id });

  if (Object.keys(sizeTranslations).includes(data.getSizeById?.message)) {
    throw new Error(
      `${data.getSizeById.statusCode} ${
        sizeTranslations[data.getSizeById.message]
      }`
    );
  }

  return data.getSizeById;
};

export const addSize = async (size) => {
  const query = `
      mutation($size: SizeInput!) {
        addSize(size: $size) {
          ... on Size {
            _id
            name
          }
          ... on Error {
            statusCode
            message
          }
        }
      }
    `;

  const { data } = await setItems(query, { size });

  return data.addSize;
};

export const updateSize = async (id, size) => {
  const query = `
      mutation($id: ID!, $size: SizeInput!) {
        updateSize(id: $id, size: $size) {
          ... on Size {
            _id
            name
          }
          ... on Error {
            statusCode
            message
          }
        }
      }
    `;

  const { data } = await setItems(query, { id, size });

  if (Object.keys(sizeTranslations).includes(data.updateSize?.message)) {
    throw new Error(
      `${data.updateSize.statusCode} ${
        sizeTranslations[data.updateSize.message]
      }`
    );
  }

  return data.updateSize;
};

export const deleteSize = async (id) => {
  const query = `
      mutation($id: ID!) {
        deleteSize(id: $id) {
          ... on Size {
            _id
            name
            available
          }
          ... on Error {
            statusCode
            message
          }
        }
      }
    `;

  const { data } = await setItems(query, { id });

  if (Object.keys(sizeTranslations).includes(data.deleteSize?.message)) {
    throw new Error(
      `${data.deleteSize.statusCode} ${
        sizeTranslations[data.deleteSize.message]
      }`
    );
  }

  return data.deleteSize;
};
