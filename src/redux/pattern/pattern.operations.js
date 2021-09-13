import { getItems, setItems } from '../../utils/client';
import { patternTranslations } from '../../translations/pattern.translations';

export const getAllPatterns = async (limit, skip, filter) => {
  const getAllPatternsQuery = `
query ($limit: Int!, $skip: Int!, $filter: PatternFilterInput) {
  getAllPatterns(limit: $limit, skip: $skip, filter: $filter) {
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
          _id
          name {
            lang
            value
          }
        }
        handmade
      }
      description {
        lang
        value
      }
      images {
        thumbnail
        medium
        small
        large
      }
      constructorImg
      additionalPrice {
        value
        type
      }
      available
      customizable
    }
  }
}`;

  const result = await getItems(getAllPatternsQuery, {
    skip,
    limit,
    filter
  });

  return result?.data?.getAllPatterns;
};

export const getPatternById = async (id) => {
  const getPatternByIdQuery = `
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
            model{
              _id
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
            additionalPrice {
              value
              type
            }
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await getItems(getPatternByIdQuery, { id });

  if (
    Object.keys(patternTranslations).includes(
      result?.data?.getPatternById?.message
    )
  ) {
    throw new Error(
      `${result.data.getPatternById.statusCode} ${
        patternTranslations[result.data.getPatternById.message]
      }`
    );
  }

  return result?.data?.getPatternById;
};

export const deletePattern = async (id) => {
  const deletePatternQuery = `
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

  const result = await setItems(deletePatternQuery, { id });

  return result?.data?.deletePattern;
};

export const createPattern = async (payload) => {
  const createPatternQuery = `
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

  const result = await setItems(createPatternQuery, payload);

  if (
    Object.keys(patternTranslations).includes(result?.data?.addPattern?.message)
  ) {
    throw new Error(
      `${result.data.addPattern.statusCode} ${
        patternTranslations[result.data.addPattern.message]
      }`
    );
  }

  return result?.data?.addPattern;
};

export const updatePattern = async (payload) => {
  const updatePatternQuery = `
      mutation($id: ID!, $pattern: PatternInput!, $image: Upload) {
        updatePattern(id: $id, pattern: $pattern, image: $image) {
          ... on Pattern {
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

  const result = await setItems(updatePatternQuery, payload);

  if (
    Object.keys(patternTranslations).includes(
      result?.data?.updatePattern?.message
    )
  ) {
    throw new Error(
      `${result.data.updatePattern.statusCode} ${
        patternTranslations[result.data.updatePattern.message]
      }`
    );
  }

  return result?.data?.updatePattern;
};
