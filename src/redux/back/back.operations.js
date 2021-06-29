import { backTranslations } from '../../translations/back.translations';
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
      model {
        _id
        category {
          _id
          code
        }
        name {
          lang
        }
        description {
          lang
          value
        }
      }
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
      image 
      additionalPrice {
        currency
        value
      }
      available
      customizable
    }
  }
}
`;

  const result = await getItems(getAllBacksQuery, {
    skip,
    limit,
    filter
  });

  return result?.data?.getAllBacks;
};

export const getBackById = async (id) => {
  const getBackByIdQuery = `
      query($id: ID!) {
        getPatternById(id: $id) {
          ... on Pattern {
            _id
            name {
              value
            }
            description {
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
              handmade
            }
            available
            images {
              thumbnail
            }
            constructorImg
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
        deletePattern(id: $id) {
          ... on Pattern {
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
              handmade
            }
            available
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await setItems(deleteBackQuery, { id });

  return result?.data?.deleteBack;
};

export const createBack = async (payload) => {
  const createBackQuery = `
      mutation($pattern: PatternInput!, $image: Upload!) {
        addPattern(pattern: $pattern, image: $image) {
          ... on Pattern {
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
              handmade
            }
            available
            constructorImg
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await setItems(createBackQuery, payload);

  if (
    Object.keys(backTranslations).includes(result?.data?.addPattern?.message)
  ) {
    throw new Error(
      `${result.data.addBack.statusCode} ${
        backTranslations[result.data.addBack.message]
      }`
    );
  }

  return result?.data?.addBack;
};

export const updateBack = async (payload) => {
  const updateBackQuery = `
      mutation($id: ID!, $pattern: PatternInput!, $image: Upload) {
        updatePattern(id: $id, pattern: $pattern, image: $image) {
          ... on Pattern {
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
              handmade
            }
            available
            constructorImg
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
