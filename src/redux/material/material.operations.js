import { gql } from '@apollo/client';
import { client } from '../../utils/client';

import { materialTranslations } from '../../translations/material.translations';
import { getFromLocalStorage } from '../../services/local-storage.service';

export const getAllMaterials = async (skip, limit) => {
  const result = await client.query({
    variables: {
      skip,
      limit
    },
    query: gql`
      query($skip: Int, $limit: Int) {
        getAllMaterials(skip: $skip, limit: $limit) {
          items {
            _id
            name {
              value
            }
            description {
              lang
              value
            }
            available
            additionalPrice {
              value
            }
            purpose
            colors {
              simpleName {
                lang
                value
              }
            }
          }
          count
        }
      }
    `
  });
  client.resetStore();
  return result.data.getAllMaterials;
};

export const getMaterialById = async (id) => {
  const result = await client.query({
    variables: { id },
    query: gql`
      query($id: ID!) {
        getMaterialById(id: $id) {
          ... on Material {
            name {
              value
            }
            description {
              lang
              value
            }
            available
            additionalPrice {
              value
            }
            purpose
            colors {
              available
              code

              images {
                thumbnail
                small
                medium
                large
              }
              simpleName {
                lang
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
    `,
    fetchPolicy: 'no-cache'
  });
  const { data } = result;

  if (data.getMaterialById.message) {
    throw new Error(
      `${data.getMaterialById.statusCode} ${
        materialTranslations[data.getMaterialById.message]
      }`
    );
  }

  return data.getMaterialById;
};

export const deleteMaterial = async (id) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

  const result = await client.mutate({
    context: { headers: { token } },
    variables: { id },
    mutation: gql`
      mutation($id: ID!) {
        deleteMaterial(id: $id) {
          ... on Material {
            name {
              value
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
  client.resetStore();
  const { data } = result;

  if (data.deleteMaterial.message) {
    throw new Error(
      `${data.deleteMaterial.statusCode} ${
        materialTranslations[data.deleteMaterial.message]
      }`
    );
  }

  return data.deleteMaterial;
};

export const createMaterial = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

  const result = await client.mutate({
    context: { headers: { token } },
    variables: payload,

    mutation: gql`
      mutation($material: MaterialInput!, $images: Upload) {
        addMaterial(material: $material, images: $images) {
          ... on Material {
            _id
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

  if (data.addMaterial.message) {
    throw new Error(
      `${data.addMaterial.statusCode} ${
        materialTranslations[data.addMaterial.message]
      }`
    );
  }

  return data.addMaterial;
};

export const updateMaterial = async (id, material, images) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

  const result = await client.mutate({
    context: { headers: { token } },
    variables: {
      id,
      material,
      images
    },
    mutation: gql`
      mutation($id: ID!, $material: MaterialInput!,images:Upload) {
        updateMaterial(id: $id, material: $material,images:$images) {
          ... on Material {
            name {
              value
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
  client.resetStore();
  const { data } = result;

  if (data.updateMaterial.message) {
    throw new Error(
      `${data.updateMaterial.statusCode} ${
        materialTranslations[data.updateMaterial.message]
      }`
    );
  }

  return data.updateMaterial;
};
