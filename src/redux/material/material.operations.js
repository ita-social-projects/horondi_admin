import { gql } from '@apollo/client';
import { client } from '../../utils/client';

import { materialTranslations } from '../../translations/material.translations';

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
  const { data } = result;
  return data.getAllMaterials;
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
  console.log(id);
  const result = await client.mutate({
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

export const createMaterial = async (material) => {
  const result = await client.mutate({
    mutation: gql`
      mutation($material: MaterialInput!) {
        addMaterial(material: $material) {
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
    fetchPolicy: 'no-cache',
    variables: { material }
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

export const updateMaterial = async (id, material) => {
  const result = await client.mutate({
    variables: {
      id,
      material
    },
    mutation: gql`
      mutation($id: ID!, $material: MaterialInput!) {
        updateMaterial(id: $id, material: $material) {
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
