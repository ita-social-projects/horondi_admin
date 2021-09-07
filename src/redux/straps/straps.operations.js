import { setItems, getItems } from '../../utils/client';

export const getAllStraps = async (limit, skip, filter) => {
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
  console.log(result.data);
  return result?.data?.getAllPockets;
};

export const createStrap = async (payload) => {
  const query = `
          mutation($strap: StrapInput!, $image: Upload!) {
              addStrap(strap: $strap, image: $image) {
                  ... on Strap {
                items {
                _id
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
                features {
              color {
                _id
              }
            }
                additionalPrice {
                    currency
                    value
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

  const result = await setItems(query, payload);

  return result?.data?.addStrap;
};

export const deleteStrap = async (id) => {
  const query = `
        mutation($id: ID!) {
            deleteStrap(id: $id) {
            ... on Strap {
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

  return result?.data?.deleteStrap;
};

export const getStrapById = async (id) => {
  const query = `
        query($id: ID!) {
          getStrapById(id: $id) {
            ... on Strap {
              _id
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
              features {
              color {
                 _id
              }
              }
              available
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

  return result?.data?.getStrapById;
};

export const updateStrap = async (id, strap, image) => {
  const query = `
        mutation (
          $id: ID!
          $strap: StrapInput!
          $image: Upload
        ) {
          updateStrap(id: $id, strap: $strap, image: $image) {
            ... on Strap {
             _id
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
              features {
              color {
                 _id
              }
              }
              available
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
  const result = await setItems(query, { id, strap, image });

  return result?.data?.updateStrap;
};
