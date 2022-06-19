import { setItems, getItems } from '../../utils/client';

export const getAllClosures = async (limit, skip, filter) => {
  const query = `
    query($limit: Int!, $skip: Int!,$filter: ClosureFilterInput) {
      getAllClosure(limit: $limit, skip: $skip,filter: $filter) {
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
          optionType
          absolutePrice
          relativePrice
          available
          customizable
        }
        count
      }
    }
  `;

  const result = await getItems(query, { limit, skip, filter });
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
          available
          optionType
          images {
            large
            medium
            small
            thumbnail
          }
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

  return result?.data?.getClosureById;
};

export const updateClosure = async ({ id, closure, upload: image }) => {
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
