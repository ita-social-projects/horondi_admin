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

  const { getColorById } = result.data;
  if (getColorById.message) {
    throw new Error(
      `${getColorById.statusCode} ${colorsTranslations[getColorById.message]}`
    );
  }

  return getColorById;
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

  const { addColor } = result.data;
  if (addColor.message) {
    throw new Error(
      `${addColor.statusCode} ${colorsTranslations[addColor.message]}`
    );
  }

  return addColor;
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
              color {
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

  const { deleteColor } = result.data;
  if (deleteColor.message) {
    throw new Error(
      `${deleteColor.statusCode} ${colorsTranslations[deleteColor.message]}`
    );
  } else if (deleteColor.items) {
    return deleteColor.items;
  }

  return deleteColor;
};
