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

  const result = await getItems(query);

  return result?.data?.getAllHeaders;
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

  const result = await getItems(query, { id });

  if (
    Object.keys(headerTranslations).includes(
      result?.data?.getHeaderById?.message
    )
  ) {
    throw new Error(
      `${result.data.getHeaderById.statusCode} ${
        headerTranslations[result.data.getHeaderById.message]
      }`
    );
  }

  return result?.data?.getHeaderById;
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

  const result = await setItems(query, { id });

  if (
    Object.keys(headerTranslations).includes(
      result?.data?.deleteHeader?.message
    )
  ) {
    throw new Error(
      `${result.data.deleteHeader.statusCode} ${
        headerTranslations[result.data.deleteHeader.message]
      }`
    );
  }

  return result?.data?.deleteHeader;
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

  const result = await setItems(query, payload);

  if (
    Object.keys(headerTranslations).includes(result?.data?.addHeader?.message)
  ) {
    throw new Error(
      `${result.data.addHeader.statusCode} ${
        headerTranslations[result.data.addHeader.message]
      }`
    );
  }

  return result?.data?.addHeader;
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

  const result = await setItems(query, { id, header, image });

  if (
    Object.keys(headerTranslations).includes(
      result?.data?.updateHeader?.message
    )
  ) {
    throw new Error(
      `${result.data.updateHeader.statusCode} ${
        headerTranslations[result.data.updateHeader.message]
      }`
    );
  }

  return result?.data?.updateHeader;
};
