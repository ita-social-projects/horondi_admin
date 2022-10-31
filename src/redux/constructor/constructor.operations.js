import { gql } from '@apollo/client';
import { getItems, setItems, client } from '../../utils/client';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { constructorErrors } from '../../configs/error-modal-messages';

const constructorElementRequest = `
  _id
  available
  default
  basePrice
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
        constructorErrors[data.deleteConstructorBasic.message]
      }`
    );
  }
  return data.deleteConstructorBasic;
};

export const createConstructor = async (payload) => {
  const createConstructorQuery = `
      mutation($constructor: ConstructorInput!, $image: Upload) {
        addConstructor(constructor: $constructor, image: $image) {
          ... on Constructor {
            _id
            name {
              lang
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

  const result = await setItems(createConstructorQuery, payload);

  if (
    Object.keys(constructorErrors).includes(
      result?.data?.addConstructor?.message
    )
  ) {
    throw new Error(
      `${result.data.addConstructor.statusCode} ${
        constructorErrors[result.data.addConstructor.message]
      }`
    );
  }

  return result?.data?.addConstructor;
};

export const deleteConstructor = async (id) => {
  const deleteConstructorQuery = `
  mutation($id: ID!) {
        deleteConstructor(id: $id) {
          ... on Constructor {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await setItems(deleteConstructorQuery, { id });

  if (
    Object.keys(constructorErrors).includes(
      result?.data?.deleteConstructor?.message
    )
  ) {
    throw new Error(
      `${result.data.deleteConstructor.statusCode} ${
        constructorErrors[result.data.deleteConstructor.message]
      }`
    );
  }

  return result?.data?.deleteConstructor;
};

export const getAllConstructors = async (payload) => {
  const getAllConstructorsQuery = `
      query($limit: Int!, $skip: Int!, $filter: ConstructorFilterInput) {
        getAllConstructors(limit: $limit, skip: $skip, filter: $filter) {
          items {
            _id
            name {
              lang
              value
            }
            model {
              images {
                large
                medium
                small
                thumbnail
              }
            }
          }
        }
      }
    `;

  const result = await getItems(getAllConstructorsQuery, payload);

  if (
    Object.keys(constructorErrors).includes(
      result?.data?.getAllConstructors?.message
    )
  ) {
    throw new Error(
      `${result.data.getAllConstructors.statusCode} ${
        constructorErrors[result.data.getAllConstructors.message]
      }`
    );
  }

  return result?.data?.getAllConstructors;
};

export const getConstructorById = async (payload) => {
  const getConstructorQuery = `
      query($id: ID!) {
        getConstructorById(id:$id){
          ...on Constructor{
            _id
            model {
              _id
              name{
                lang
                value
              }
            }
            name {
              lang
              value
            }
            bottoms {
              _id
            }
            basics {
              _id
            }
            patterns {
              _id
            }
            backs {
              _id
            }
            straps {
              _id
            }
            closures {
              _id
            }
            pockets{
              _id
            }
            basePrice
          }
          ...on Error{
            message
            statusCode
          }
        }
      }
    `;

  const result = await getItems(getConstructorQuery, { id: payload });

  if (
    Object.keys(constructorErrors).includes(
      result?.data?.getConstructorById?.message
    )
  ) {
    throw new Error(
      `${result.data.getConstructorById.statusCode} ${
        constructorErrors[result.data.getConstructorById.message]
      }`
    );
  }

  return result?.data?.getConstructorById;
};

export const updateConstructorById = async ({ id, constructor }) => {
  const updateConstructorQuery = `
  mutation($constructor: ConstructorInput!, $id:ID!){
    updateConstructor(id:$id, constructor:$constructor){
      ...on Constructor{
        _id
        name{
          lang
          value
        }
        model{
          _id
          name{
            lang
            value
          }
        }
      }
      ...on Error{
        message
        statusCode
      }
    }
  }
    `;

  const result = await getItems(updateConstructorQuery, { id, constructor });

  if (
    Object.keys(constructorErrors).includes(
      result?.data?.updateConstructor?.message
    )
  ) {
    throw new Error(
      `${result.data.updateConstructor.statusCode} ${
        constructorErrors[result.data.updateConstructor.message]
      }`
    );
  }

  return result?.data?.updateConstructor;
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
        constructorErrors[data.addConstructorBasic.message]
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
        constructorErrors[data.updateConstructorBasic.message]
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
        constructorErrors[data.addConstructorBottom.message]
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
        constructorErrors[data.deleteConstructorBottom.message]
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
        constructorErrors[data.updateConstructorBottom.message]
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
        constructorErrors[data.addConstructorFrontPocket.message]
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
        constructorErrors[data.deleteConstructorFrontPocket.message]
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
        constructorErrors[data.updateConstructorFrontPocket.message]
      }`
    );
  }
  return data.updateConstructorFrontPocket;
};
