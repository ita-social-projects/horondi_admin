import { setItems, getItems } from '../../utils/client';

export const getAllPockets = async (limit, skip, filter) => {
  const query = `
        query($limit: Int!, $skip: Int!, $filter: PocketFilterInput) {
            getAllPockets(limit: $limit, skip: $skip, filter: $filter) {
            ... on PaginatedPockets {
                items {
                _id
                name {
                    lang
                    value
                }
                optionType
                images {
                    large
                    medium
                    small
                    thumbnail
                }
                additionalPrice {
                    currency
                    value
                }
                restriction
                }
                count
            }
            }
        }
      `;

  const result = await getItems(query, { limit, skip, filter });

  return result?.data?.getAllPockets;
};

export const createPockets = async (payload) => {
  const query = `
          mutation($pocket: PocketInput!, $upload: Upload!) {
              addPocket(pocket: $pocket, images: $upload) {
                  ... on Pocket {
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

  return result?.data?.addPocket;
};

export const deletePocket = async (id) => {
  const query = `
        mutation($id: ID!) {
            deletePocket(id: $id) {
            ... on Pocket {
              _id
            }
            ... on Error {
              statusCode
              message
            }
          }
        }
      `;

  const result = await setItems(query, { id });

  return result?.data?.deletePocket;
};

export const getPocketById = async (id) => {
  const query = `
        query($id: ID!) {
          getPocketById(id: $id) {
            ... on Pocket {
              _id
              name {
                lang
                value
              }
              optionType
              images {
                large
                medium
                small
                thumbnail
              }
              restriction
              additionalPrice {
                currency
                value
              }
            }
            ... on Error {
              statusCode
              message
            }
          }
        }
      `;

  const result = await getItems(query, { id });

  return result?.data?.getPocketById;
};

export const updatePocket = async (id, pocket, image) => {
  const query = `
        mutation updatePocket(
          $id: ID!
          $pocket: PocketInput!
          $image: Upload
        ) {
          updatePocket(id: $id, pocket: $pocket, image: $image) {
            ... on Pocket {
              _id
            }
            ... on Error {
              statusCode
              message
            }
          }
        }
      `;
  const result = await setItems(query, { id, pocket, image });

  return result?.data?.updatePocket;
};
