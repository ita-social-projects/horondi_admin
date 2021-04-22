import { getItems, setItems } from '../../utils/client';
import { headerTranslations } from '../../translations/header.translations';

export const getAllHeaders = async () => {
  const query = `
      query {
        getAllHeaders {
          _id
          link
          title {
            lang
            value
          }
          priority
        }
      }
    `;

  const { data } = await getItems(query);

  return data.getAllHeaders;
};
export const getHeaderById = async (id) => {
  const query = `
      query($id: ID!) {
        getHeaderById(id: $id) {
          ... on Header {
            _id
            link
            title {
              lang
              value
            }
            priority
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const { data } = await getItems(query, { id });

  if (Object.keys(headerTranslations).includes(data.getHeaderById?.message)) {
    throw new Error(
      `${data.getHeaderById.statusCode} ${
        headerTranslations[data.getHeaderById.message]
      }`
    );
  }

  return data.getHeaderById;
};
export const deleteHeader = async (id) => {
  const query = `
      mutation($id: ID!) {
        deleteHeader(id: $id) {
          ... on Header {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const { data } = await setItems(query, { id });

  if (Object.keys(headerTranslations).includes(data.deleteHeader?.message)) {
    throw new Error(
      `${data.deleteHeader.statusCode} ${
        headerTranslations[data.deleteHeader.message]
      }`
    );
  }

  return data.deleteHeader;
};
export const createHeader = async (payload) => {
  const query = `
      mutation($header: HeaderInput!) {
        addHeader(header: $header) {
          ... on Header {
            _id
            link
            title {
              lang
              value
            }
            priority
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const { data } = await setItems(query, payload);

  if (Object.keys(headerTranslations).includes(data.addHeader?.message)) {
    throw new Error(
      `${data.addHeader.statusCode} ${
        headerTranslations[data.addHeader.message]
      }`
    );
  }

  return data.addHeader;
};
export const updateHeader = async ({ id, header, image }) => {
  const query = `
      mutation($id: ID!, $header: HeaderInput!) {
        updateHeader(id: $id, header: $header) {
          ... on Header {
            _id
            link
            title {
              lang
              value
            }
            priority
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const { data } = await setItems(query, { id, header, image });

  if (Object.keys(headerTranslations).includes(data.updateHeader?.message)) {
    throw new Error(
      `${data.updateHeader.statusCode} ${
        headerTranslations[data.updateHeader.message]
      }`
    );
  }

  return data.updateHeader;
};
