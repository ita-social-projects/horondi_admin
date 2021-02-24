import { gql } from '@apollo/client';
import { client } from '../../utils/client';

import { getFromLocalStorage } from '../../services/local-storage.service';
import { colorsTranslations } from '../../translations/colors.translations';

const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

const colorRequest = `
  _id
  colorHex
  name {
    value
    lang
  }
  simpleName {
    value
    lang
  }
`;

export const getAllColors = async () => {
  const result = await client.query({
    query: gql`
      query {
        getAllColors{
         ${colorRequest}
        }
      }
    `
  });
  return result.data.getAllColors;
};

export const getColorById = async (id) => {
  const result = await client.query({
    variables: { id },
    query: gql`
      query($id: ID!) {
        getColorById(id: $id) {
          ... on Color {
            ${colorRequest}
          }
          ... on Error {
            statusCode
            message
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });

  const { getColorById: color } = result.data;
  if (color.message) {
    throw new Error(`${color.statusCode} ${colorsTranslations[color.message]}`);
  }

  return color;
};

export const createColor = async (payload) => {
  const result = await client.mutate({
    context: { headers: { token } },
    variables: payload,

    mutation: gql`
      mutation($input: ColorInput!) {
        addColor(data: $input) {
          ... on Color {
            ${colorRequest}
          }
          ...on Error {
            statusCode
            message
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });

  const { addColor: color } = result.data;
  if (color.message) {
    throw new Error(`${color.statusCode} ${colorsTranslations[color.message]}`);
  }

  return color;
};

export const deleteColor = async (id) => {
  const result = await client.mutate({
    context: { headers: { token } },
    variables: { id },
    mutation: gql`
      mutation($id: ID!) {
        deleteColor(id: $id) {
          ... on Color {
            _id
          }
          ... on Materials {
            items {
              _id
              name {
                lang
                value
              }
              description {
                lang
                value
              }
              purpose
              colors {
                _id
              }
              available
              additionalPrice {
                currency
                value
              }
            }
          }
          ... on Error {
            statusCode
            message
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });

  const { deleteColor: color } = result.data;
  if (color.message) {
    throw new Error(`${color.statusCode} ${colorsTranslations[color.message]}`);
  } else if (color.items) {
    return color.items;
  }

  return color;
};
