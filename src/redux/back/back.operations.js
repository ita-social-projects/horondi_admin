import { backTranslations } from '../../configs/error-modal-messages';
import { getItems, setItems } from '../../utils/client';

export const getAllBacks = async (limit, skip, filter) => {
  const getAllBacksQuery = `
    query($limit: Int!, $skip: Int!, $filter: BackFilterInput) {
      getAllBacks(limit: $limit, skip: $skip, filter: $filter) {
        count
        items {
        _id
        name {
          lang
          value
        }
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
        images {
          thumbnail
          medium
          small
          large
        }
        absolutePrice
        relativePrice
        available
      }
    }
  }
`;

  const result = await getItems(getAllBacksQuery, {
    skip,
    limit,
    filter
  });

  if (
    Object.keys(backTranslations).includes(result?.data?.getAllBacks?.message)
  ) {
    throw new Error(`${backTranslations[result.data.getAllBacks.message]}`);
  }
  return result?.data?.getAllBacks;
};

export const getBackById = async (id) => {
  const getBackByIdQuery = `
    query($id: ID!) {
      getBackById(id: $id) {
        ... on Back {
          _id
          name {
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
            color{
              _id
              name{
                lang
                value
              }
            }
          }
          available
          absolutePrice
          relativePrice
          optionType
          images {
            thumbnail
          }
        }
        ... on Error {
          message
          statusCode
        }
      }
    }
  `;

  const result = await getItems(getBackByIdQuery, { id });

  if (
    Object.keys(backTranslations).includes(result?.data?.getBackById?.message)
  ) {
    throw new Error(
      `${result.data.getBackById.statusCode} ${
        backTranslations[result.data.getBackById.message]
      }`
    );
  }

  return result?.data?.getBackById;
};

export const deleteBack = async (id) => {
  const deleteBackQuery = `
    mutation($id: ID!) {
      deleteBack(id: $id) {
        ... on Back {
          _id
        }
        ... on Error {
          statusCode
          message
        }
      }
    }
  `;

  const result = await setItems(deleteBackQuery, { id });

  return result?.data?.deleteBack;
};

export const createBack = async (payload) => {
  const createBackQuery = `
    mutation($back: BackInput!, $image: Upload!) {
      addBack(back: $back, image: $image) {
        ... on Back {
          _id
          name {
            lang
            value
          }
        }
        ... on Error {
          message
          statusCode
        }
      }
    }
  `;

  const result = await setItems(createBackQuery, payload);
  if (Object.keys(backTranslations).includes(result?.data?.addBack?.message)) {
    throw new Error(`${backTranslations[result.data.addBack.message]}`);
  }

  return result?.data?.addBack;
};

export const updateBack = async (payload) => {
  const updateBackQuery = `
    mutation($id: ID!, $back: BackInput!, $image: Upload) {
      updateBack(id: $id, back: $back, image: $image) {
        ... on Back{
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
          absolutePrice
          relativePrice
          available
        }
        ... on Error {
          message
          statusCode
        }
      }
    }
  `;

  const result = await setItems(updateBackQuery, payload);

  if (
    Object.keys(backTranslations).includes(result?.data?.updateBack?.message)
  ) {
    throw new Error(
      `${result.data.updateBack.statusCode} ${
        backTranslations[result.data.updateBack.message]
      }`
    );
  }

  return result?.data?.updateBack;
};
