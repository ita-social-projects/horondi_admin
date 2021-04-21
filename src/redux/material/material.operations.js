import { getItems, setItems } from '../../utils/client';
import { materialTranslations } from '../../translations/material.translations';

export const getAllMaterials = async (filter, skip, limit) => {
  const query = `
      query($filter: MaterialFilterInput, $skip: Int, $limit: Int) {
        getAllMaterials(filter: $filter, skip: $skip, limit: $limit) {
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
          }
          count
        }
      }
    `;
  const { data } = await getItems(query, {
    filter,
    skip,
    limit
  });

  return data.getAllMaterials;
};
export const getAllMaterialsByPatternPurpose = async () => {
  const query = `
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
    `;

  const { data } = await getItems(query);

  return data.getMaterialsByPurpose;
};

export const getMaterialById = async (id) => {
  const query = `
      query($id: ID!) {
        getMaterialById(id: $id) {
          ... on Material {
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
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const { data } = await getItems(query, { id });

  if (
    Object.keys(materialTranslations).includes(data.getMaterialById?.message)
  ) {
    throw new Error(`${materialTranslations[data.getMaterialById.message]}`);
  }

  return data.getMaterialById;
};
export const deleteMaterial = async (id) => {
  const query = `
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
    `;
  const { data } = await setItems(query, { id });

  if (
    Object.keys(materialTranslations).includes(data.deleteMaterial?.message)
  ) {
    throw new Error(`${materialTranslations[data.deleteMaterial.message]}`);
  }

  return data.deleteMaterial;
};
export const createMaterial = async (payload) => {
  const query = `
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
    `;

  const { data } = await setItems(query, payload);

  if (Object.keys(materialTranslations).includes(data.addMaterial?.message)) {
    throw new Error(`${materialTranslations[data.addMaterial.message]}`);
  }

  return data.addMaterial;
};

export const updateMaterial = async (id, material) => {
  const query = `
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
    `;

  const { data } = await getItems(query, { id, material });

  if (
    Object.keys(materialTranslations).includes(data.updateMaterial?.message)
  ) {
    throw new Error(`${materialTranslations[data.updateMaterial.message]}`);
  }

  return data.updateMaterial;
};
