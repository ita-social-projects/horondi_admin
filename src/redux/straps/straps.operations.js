import { setItems, getItems } from '../../utils/client';

export const getAllStraps = async (limit, skip, filter) => {
  const query = `
    query($limit: Int!, $skip: Int!, $filter: StrapFilterInput) {
      getAllStraps(limit: $limit, skip: $skip, filter: $filter) {
        items {
          _id
          name {
            lang
            value
          }
          features {
            material {
              _id
              name {
                lang
                value
              }
            }
            color {
              _id
              name {
                lang
                value
              }
            }
          }
          images {
            thumbnail
            medium
            small
            large
          }
          available
          absolutePrice
          relativePrice
          optionType
        }
        count
      }
    }
  `;

  const result = await getItems(query, { limit, skip, filter });

  return result?.data?.getAllStraps;
};

export const createStrap = async (payload) => {
  const query = `
    mutation($strap: StrapInput!, $image: Upload) {
      addStrap(strap: $strap, image: $image) {
        ... on Strap {
          _id
          name {
            lang
            value
          }
          optionType
          features {
            material {
              _id
              name {
                lang
                value
              }
            }
            color {
              _id
              name {
                lang
                value
              }
            }
          }
          images {
            thumbnail
            medium
            small
            large
          }
          available
          absolutePrice
          relativePrice
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
          message
          statusCode
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
          optionType
          features {
            material {
              _id
              name {
                lang
                value
              }
            }
            color {
              _id
              name {
                lang
                value
              }
            }
          }
          images {
            thumbnail
            medium
            small
            large
          }
          available
          absolutePrice
          relativePrice
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

export const updateStrap = async (payload) => {
  const query = `
    mutation($id: ID!, $strap: StrapInput!, $image: Upload) {
      updateStrap(id: $id, strap: $strap, image: $image) {
        ... on Strap {
          _id
          name {
            lang
            value
          }
          optionType
          features {
            material {
              _id
              name {
                lang
                value
              }
            }
            color {
              _id
              name {
                lang
                value
              }
            }
          }
          images {
            thumbnail
            medium
            small
            large
          }
          available
          absolutePrice
          relativePrice
        }
        ... on Error {
          message
          statusCode
        }
      }
    }
  `;
  const result = await setItems(query, payload);

  return result?.data?.updateStrap;
};
