import { gql } from '@apollo/client';
import { client } from '../../utils/client';

import { materialTranslations } from '../../translations/material.translations';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { config } from '../../configs';

const materialRequest = `
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
    _id
    name {
      lang
      value
    }
    simpleName {
      lang
      value
    }
    colorHex
  }
`;

export const getAllMaterials = async (filter, skip, limit) => {
  const result = await client.query({
    variables: {
      filter,
      skip,
      limit
    },
    query: gql`
      query($filter: MaterialFilterInput, $skip: Int, $limit: Int) {
        getAllMaterials(filter: $filter, skip: $skip, limit: $limit) {
          items {
            ${materialRequest}
          }
          count
        }
      }
    `
  });
  client.resetStore();
  return result.data.getAllMaterials;
};
export const getAllMaterialsByPatternPurpose = async () => {
  const result = await client.query({
    query: gql`
      query {
        getMaterialsByPurpose(purposes: PATTERN) {
          pattern {
            _id
            name {
              lang
              value
            }
          }
        }
      }
    `
  });

  return result.data.getMaterialsByPurpose;
};

export const getMaterialById = async (id) => {
  const result = await client.query({
    variables: { id },
    query: gql`
      query($id: ID!) {
        getMaterialById(id: $id) {
          ... on Material {
            ${materialRequest}
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
    throw new Error(`${materialTranslations[data.getMaterialById.message]}`);
  }

  return data.getMaterialById;
};
export const deleteMaterial = async (id) => {
  const token = getFromLocalStorage(config.tokenName);

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
    throw new Error(`${materialTranslations[data.deleteMaterial.message]}`);
  }

  return data.deleteMaterial;
};

export const createMaterial = async (payload) => {
  const token = getFromLocalStorage(config.tokenName);

  const result = await client.mutate({
    context: { headers: { token } },
    variables: payload,

    mutation: gql`
      mutation($material: MaterialInput!) {
        addMaterial(material: $material) {
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
    throw new Error(`${materialTranslations[data.addMaterial.message]}`);
  }

  return data.addMaterial;
};

export const updateMaterial = async (id, material) => {
  const token = getFromLocalStorage(config.tokenName);
  const result = await client.mutate({
    context: { headers: { token } },
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
            additionalPrice {
              value
            }
            colors {
              _id
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
    throw new Error(`${materialTranslations[data.updateMaterial.message]}`);
  }

  return data.updateMaterial;
};
