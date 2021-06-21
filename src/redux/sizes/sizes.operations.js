import { getItems, setItems } from '../../utils/client';
import { sizeTranslations } from '../../translations/sizes.translations';

export const getAllSizes = async (limit, skip, filter) => {
  const query = `
      query (
      $limit: Int
      $skip: Int
      $filter:SizeFilterInput
    ){
        getAllSizes(limit: $limit, skip: $skip, filter: $filter) {
        items {
          _id
          name
          modelId { 
            _id
            name { 
              value
              lang
            }
          }
          available
          }
          count
        }
      }
    `;

  const result = await getItems(query, { limit, skip, filter });
  return result?.data?.getAllSizes;
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

  const result = await getItems(query, { id });

  if (
    Object.keys(sizeTranslations).includes(result?.data?.getSizeById.message)
  ) {
    throw new Error(
      `${result.data.getSizeById.statusCode} ${
        sizeTranslations[result.data.getSizeById.message]
      }`
    );
  }

  return result?.data?.getSizeById;
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

  const result = await setItems(query, { size });

  return result?.data?.addSize;
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

  const result = await setItems(query, { id, size });

  if (
    Object.keys(sizeTranslations).includes(result?.data?.updateSize?.message)
  ) {
    throw new Error(
      `${result.data.updateSize.statusCode} ${
        sizeTranslations[result.data.updateSize.message]
      }`
    );
  }

  return result?.data?.updateSize;
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

  const result = await setItems(query, { id });

  if (
    Object.keys(sizeTranslations).includes(result?.data?.deleteSize?.message)
  ) {
    throw new Error(
      `${result?.data?.deleteSize.statusCode} ${
        sizeTranslations[result?.data?.deleteSize.message]
      }`
    );
  }

  return result?.data?.deleteSize;
};
