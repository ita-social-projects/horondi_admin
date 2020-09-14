import { gql } from '@apollo/client';
import { client } from '../../utils/client';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { patternTranslations } from '../../translations/pattern.translations';

const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
export const getAllPatterns = async (skip, limit) => {
  const result = await client.query({
    variables: {
      skip,
      limit
    },
    query: gql`
      query($skip: Int, $limit: Int) {
        getAllPatterns(skip: $skip, limit: $limit) {
          items {
            _id
            name {
              lang
              value
            }
            material
            available
            images {
              thumbnail
            }
          }
          count
        }
      }
    `
  });
  client.resetStore();

  return result.data.getAllPatterns;
};

export const getPatternById = async (id) => {
  const result = await client.query({
    variables: { id },
    query: gql`
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
            material
            handmade
            available
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
    `,
    fetchPolicy: 'no-cache'
  });
  const { data } = result;
  if (data.getPatternById.message) {
    throw new Error(
      `${data.getPatternById.statusCode} ${
        patternTranslations[data.getPatternById.message]
      }`
    );
  }

  return data.getPatternById;
};

export const deletePattern = async (id) => {
  const result = await client.mutate({
    variables: { id },
    context: { headers: { token } },
    mutation: gql`
      mutation($id: ID!) {
        deletePattern(id: $id) {
          ... on Pattern {
            _id
            name {
              lang
              value
            }
            material
            available
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();
  const { data } = result;

  if (data.deletePattern.message) {
    throw new Error(
      `${data.deletePattern.statusCode} ${
        patternTranslations[data.deletePattern.message]
      }`
    );
  }

  return data.deletePattern;
};

export const createPattern = async (payload) => {
  const result = await client.mutate({
    context: { headers: { token } },
    variables: payload,

    mutation: gql`
      mutation($pattern: PatternInput!, $upload: Upload!) {
        addPattern(pattern: $pattern, upload: $upload) {
          ... on Pattern {
            _id
            name {
              lang
              value
            }
            material
            available
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();
  const { data } = result;

  if (data.addPattern.message) {
    throw new Error(
      `${data.addPattern.statusCode} ${
        patternTranslations[data.addPattern.message]
      }`
    );
  }

  return data.addPattern;
};

export const updatePattern = async (payload) => {
  const { id, pattern, upload } = payload;
  const result = await client.mutate({
    context: { headers: { token } },
    variables: { id, pattern, upload },
    mutation: gql`
      mutation($id: ID!, $pattern: PatternInput!, $upload: Upload) {
        updatePattern(id: $id, pattern: $pattern, upload: $upload) {
          ... on Pattern {
            _id
            name {
              lang
              value
            }
            material
            available
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();
  const { data } = result;

  if (data.updatePattern.message) {
    throw new Error(
      `${data.updatePattern.statusCode} ${
        patternTranslations[data.updatePattern.message]
      }`
    );
  }

  return data.updatePattern;
};
