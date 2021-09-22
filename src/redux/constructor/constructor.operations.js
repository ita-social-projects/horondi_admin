import { gql } from '@apollo/client';
import { client } from '../../utils/client';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { constructorTranslations } from '../../configs/error-modal-messages';

const constructorElementRequest = `
  _id
  available
  default
  basePrice{
   value
   currency
  }
  name {
   value
   lang
  }
  image
  features {
    material{
      _id
    name {
      value
      lang
     }
    }
    color{
       _id
      colorHex
      name {
      value
      lang
     }
    }
  }
`;
export const deleteConstructorBasic = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const result = await client.mutate({
    variables: { id: payload.constructorElementID },
    context: { headers: { token } },
    mutation: gql`
      mutation ($id: ID!) {
        deleteConstructorBasic(id: $id) {
          ... on ConstructorBasic {
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
  await client.resetStore();
  const { data } = result;

  if (data.deleteConstructorBasic.message) {
    throw new Error(
      `${data.deleteConstructorBasic.statusCode} ${
        constructorTranslations[data.deleteConstructorBasic.message]
      }`
    );
  }
  return data.deleteConstructorBasic;
};

export const createConstructorBasic = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const result = await client.mutate({
    context: { headers: { token } },
    variables: {
      constructorElement: payload.constructorElement,
      upload: payload.upload
    },
    mutation: gql`
        mutation($constructorElement: ConstructorBasicInput!, $upload: Upload) {
            addConstructorBasic(constructorElement: $constructorElement, upload: $upload) {
                ... on ConstructorBasic {
                  ${constructorElementRequest}
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
  await client.resetStore();
  const { data } = result;

  if (data.addConstructorBasic.message) {
    throw new Error(
      `${data.addConstructorBasic.statusCode} ${
        constructorTranslations[data.addConstructorBasic.message]
      }`
    );
  }
  return data.addConstructorBasic;
};

export const updateConstructorBasic = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const result = await client.mutate({
    variables: {
      constructorElement: payload.constructorElement,
      id: payload.id,
      upload: payload.upload
    },
    context: { headers: { token } },
    mutation: gql`
        mutation($id: ID!, $constructorElement: ConstructorBasicInput!, $upload: Upload) {
            updateConstructorBasic(id: $id, constructorElement: $constructorElement, upload: $upload) {
                ... on ConstructorBasic {
                    ${constructorElementRequest}
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
  await client.resetStore();
  const { data } = result;

  if (data.updateConstructorBasic.message) {
    throw new Error(
      `${data.updateConstructorBasic.statusCode} ${
        constructorTranslations[data.updateConstructorBasic.message]
      }`
    );
  }
  return data.updateConstructorBasic;
};

export const createConstructorBottom = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const result = await client.mutate({
    context: { headers: { token } },
    variables: {
      constructorElement: payload.constructorElement,
      upload: payload.upload
    },
    mutation: gql`
        mutation($constructorElement: ConstructorBottomInput!, $upload: Upload) {
            addConstructorBottom(constructorElement: $constructorElement, upload: $upload) {
                ... on ConstructorBottom {
                    ${constructorElementRequest}
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
  await client.resetStore();
  const { data } = result;

  if (data.addConstructorBottom.message) {
    throw new Error(
      `${data.addConstructorBottom.statusCode} ${
        constructorTranslations[data.addConstructorBottom.message]
      }`
    );
  }
  return data.addConstructorBottom;
};

export const deleteConstructorBottom = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const result = await client.mutate({
    variables: { id: payload.constructorElementID },
    context: { headers: { token } },
    mutation: gql`
      mutation ($id: ID!) {
        deleteConstructorBottom(id: $id) {
          ... on ConstructorBottom {
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
  await client.resetStore();
  const { data } = result;

  if (data.deleteConstructorBottom.message) {
    throw new Error(
      `${data.deleteConstructorBottom.statusCode} ${
        constructorTranslations[data.deleteConstructorBottom.message]
      }`
    );
  }
  return data.deleteConstructorBottom;
};

export const updateConstructorBottom = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const result = await client.mutate({
    variables: {
      constructorElement: payload.constructorElement,
      id: payload.id,
      upload: payload.upload
    },
    context: { headers: { token } },
    mutation: gql`
        mutation($id: ID!, $constructorElement: ConstructorBottomInput!, $upload: Upload) {
            updateConstructorBottom(id: $id, constructorElement: $constructorElement, upload: $upload) {
                ... on ConstructorBottom {
                    ${constructorElementRequest}
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
  await client.resetStore();
  const { data } = result;

  if (data.updateConstructorBottom.message) {
    throw new Error(
      `${data.updateConstructorBottom.statusCode} ${
        constructorTranslations[data.updateConstructorBottom.message]
      }`
    );
  }
  return data.updateConstructorBottom;
};

export const createConstructorFrontPocket = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const result = await client.mutate({
    context: { headers: { token } },
    variables: {
      constructorElement: payload.constructorElement,
      upload: payload.upload
    },
    mutation: gql`
        mutation($constructorElement: ConstructorFrontPocketInput!, $upload: Upload) {
            addConstructorFrontPocket(constructorElement: $constructorElement, upload: $upload) {
                ... on ConstructorFrontPocket {
                    ${constructorElementRequest}
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
  await client.resetStore();
  const { data } = result;

  if (data.addConstructorFrontPocket.message) {
    throw new Error(
      `${data.addConstructorFrontPocket.statusCode} ${
        constructorTranslations[data.addConstructorFrontPocket.message]
      }`
    );
  }
  return data.addConstructorFrontPocket;
};

export const deleteConstructorFrontPocket = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const result = await client.mutate({
    variables: { id: payload.constructorElementID },
    context: { headers: { token } },
    mutation: gql`
      mutation ($id: ID!) {
        deleteConstructorFrontPocket(id: $id) {
          ... on ConstructorFrontPocket {
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
  await client.resetStore();
  const { data } = result;

  if (data.deleteConstructorFrontPocket.message) {
    throw new Error(
      `${data.deleteConstructorFrontPocket.statusCode} ${
        constructorTranslations[data.deleteConstructorFrontPocket.message]
      }`
    );
  }
  return data.deleteConstructorFrontPocket;
};

export const updateConstructorFrontPocket = async (payload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const result = await client.mutate({
    variables: {
      constructorElement: payload.constructorElement,
      id: payload.id,
      upload: payload.upload
    },
    context: { headers: { token } },
    mutation: gql`
        mutation($id: ID!, $constructorElement: ConstructorFrontPocketInput!, $upload: Upload) {
            updateConstructorFrontPocket(id: $id, constructorElement: $constructorElement, upload: $upload) {
                ... on ConstructorFrontPocket {
                    ${constructorElementRequest}
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
  await client.resetStore();
  const { data } = result;

  if (data.updateConstructorFrontPocket.message) {
    throw new Error(
      `${data.updateConstructorFrontPocket.statusCode} ${
        constructorTranslations[data.updateConstructorFrontPocket.message]
      }`
    );
  }
  return data.updateConstructorFrontPocket;
};
