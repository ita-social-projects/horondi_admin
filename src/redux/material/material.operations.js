import { getItems, setItems } from '../../utils/client';
import { materialTranslations } from '../../translations/material.translations';

export const getAllMaterials = async (skip, limit, filter) => {
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
              type
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
  const result = await getItems(query, {
    skip,
    limit,
    filter
  });

  return result?.data?.getAllMaterials;
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

  const result = await getItems(query);

  return result?.data?.getMaterialsByPurpose;
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
              type
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

  const result = await getItems(query, { id });

  if (
    Object.keys(materialTranslations).includes(
      result?.data?.getMaterialById?.message
    )
  ) {
    throw new Error(
      `${materialTranslations[result.data.getMaterialById.message]}`
    );
  }

  return result?.data?.getMaterialById;
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
  const result = await setItems(query, { id });

  if (
    Object.keys(materialTranslations).includes(
      result?.data?.deleteMaterial?.message
    )
  ) {
    throw new Error(
      `${materialTranslations[result.data.deleteMaterial.message]}`
    );
  }

  return result?.data?.deleteMaterial;
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

  const result = await setItems(query, payload);

  if (
    Object.keys(materialTranslations).includes(
      result?.data?.addMaterial?.message
    )
  ) {
    throw new Error(`${materialTranslations[result.data.addMaterial.message]}`);
  }

  return result?.data?.addMaterial;
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
              type
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

  const result = await getItems(query, { id, material });

  if (
    Object.keys(materialTranslations).includes(
      result?.data?.updateMaterial?.message
    )
  ) {
    throw new Error(
      `${materialTranslations[result.data.updateMaterial.message]}`
    );
  }

  return result?.data?.updateMaterial;
};
