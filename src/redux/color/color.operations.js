import {getItems, setItems} from '../../utils/client';
import {colorsTranslations} from '../../translations/colors.translations';

export const getAllColors = async () => {
    const query = `
      query {
        getAllColors{
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
        }
      }
    `;
    const result = await getItems(query);

    return result?.data?.getAllColors;
};
export const getColorById = async (id) => {
    const query = `
      query($id: ID!) {
        getColorById(id: $id) {
          ... on Color {
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
          }
          ... on Error {
            statusCode
            message
          }
        }
      }
    `;
    const result = await getItems(query, {id});

    if (Object.keys(colorsTranslations).includes(result?.data?.getColorById?.message)) {
        throw new Error(`${result.data.getColorById.statusCode} ${colorsTranslations[result.data.getColorById.message]}`);
    }

    return result?.data?.getColorById;
};
export const createColor = async (payload) => {
    const query = `
      mutation($input: ColorInput!) {
        addColor(data: $input) {
          ... on Color {
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
          }
          ...on Error {
            statusCode
            message
          }
        }
      }
    `;
    const result = await setItems(query, payload);

    if (Object.keys(colorsTranslations).includes(result?.data?.addColor?.message)) {
        throw new Error(`${result.data.addColor.statusCode} ${colorsTranslations[result.data.addColor.message]}`);
    }

    return result?.data?.addColor;
};
export const deleteColor = async (id) => {
    const query = `
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
    `;

    const result = await setItems(query, {id});

    if (Object.keys(colorsTranslations).includes(result?.data?.deleteColor?.message)) {
        throw new Error(`${result.data.deleteColor.statusCode} ${result.data.deleteColor[result.data.deleteColor.message]}`);
    } else if (result.data?.deleteColor.items) {
        return result.data?.deleteColor.items;
    }

    return result?.data?.deleteColor;
};
