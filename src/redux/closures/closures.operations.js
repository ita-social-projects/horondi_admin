import { setItems, getItems } from '../../utils/client';

export const getAllClosures = async (limit, skip) => {
  const query = `
    query($limit: Int!, $skip: Int!) {
  getAllClosure(limit: $limit, skip: $skip) {
    items {
      _id
      name {
        lang
        value
      }
      image
      optionType
      features {
        material {
          name {
            lang
            value
          }
        }
        color {
          name {
            lang
            value
          }
        }
      }
        additionalPrice {
        currency
        value
      }
      available
      customizable
    }
    count
  }
}
      `;

  const result = await getItems(query, { limit, skip });
  return result?.data?.getAllClosure;
};

export const createClosures = async (payload) => {
  const query = `
          mutation($closure: ClosureInput!, $upload: Upload!) {
              addClosure(closure: $closure, images: $upload) {
                  ... on Closure {
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

  return result?.data?.addClosure;
};

export const deleteClosure = async (id) => {
  const query = `
        mutation($id: ID!) {
            deleteClosure(id: $id) {
            ... on Closure {
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

  return result?.data?.deleteClosure;
};

export const getClosureById = async (id) => {
  const query = `
        query($id: ID!) {
          getClosureById(id: $id) {
            ... on Closure {
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

  return result?.data?.getClosureById;
};

export const updateClosure = async (id, closure, image) => {
  const query = `
        mutation updateClosure(
          $id: ID!
          $closure: ClosureInput!
          $image: Upload
        ) {
          updateClosure(id: $id, closure: $closure, image: $image) {
            ... on Closure {
              _id
            }
            ... on Error {
              statusCode
              message
            }
          }
        }
      `;
  const result = await setItems(query, { id, closure, image });

  return result?.data?.updateClosure;
};
