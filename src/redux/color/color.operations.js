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
    const {data} = await getItems(query);

    return data.getAllColors;
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
    const {data} = await getItems(query, {id});

    if (Object.keys(colorsTranslations).includes(data.getColorById?.message)) {
        throw new Error(`${data.getColorById.statusCode} ${colorsTranslations[data.getColorById.message]}`);
    }

    return data.getColorById;
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
    const {data} = await setItems(query, payload);

    if (Object.keys(colorsTranslations).includes(data.addColor?.message)) {
        throw new Error(`${data.addColor.statusCode} ${colorsTranslations[data.addColor.message]}`);
    }

    return data.addColor;
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

    const {data} = await setItems(query, {id});

    if (Object.keys(colorsTranslations).includes(data.deleteColor?.message)) {
        throw new Error(`${data.deleteColor.statusCode} ${data.deleteColor[data.deleteColor.message]}`);
    } else if (data.deleteColor.items) {
        return data.deleteColor.items;
    }

    return data.deleteColor;
};
