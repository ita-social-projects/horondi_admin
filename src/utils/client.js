// import {ApolloClient, gql, InMemoryCache} from '@apollo/client';
// import {createUploadLink} from 'apollo-upload-client';
//
// import {getFromLocalStorage} from '../services/local-storage.service.js';
// import {config} from '../configs';
// import {LOCAL_STORAGE} from '../consts/local-storage';
// import {AUTH_ERRORS} from "../error-messages/auth";
// import refreshAuthToken from "../helpers/regenerateAuthTokenPair";
//
// const {IntrospectionFragmentMatcher} = require('apollo-cache-inmemory');
// const introspectionResult = require('../fragmentTypes.json');
//
// const fragmentMatcher = new IntrospectionFragmentMatcher({
//     introspectionQueryResultData: introspectionResult
// });
//
// export const REACT_APP_API_URL =
//     window.env && window.env.REACT_APP_API_URL
//         ? window.env.REACT_APP_API_URL
//         : process.env.REACT_APP_API_URL;
//
// export const client = new ApolloClient({
//     link: createUploadLink({uri: REACT_APP_API_URL}),
//     cache: new InMemoryCache({
//         addTypename: false,
//         fragmentMatcher
//     })
// });
//
// const formError = (err) => err.message.replace('GraphQL error: ', '');
//
// export const getItems = async (query, variables = {}) => {
//     try {
//         const token = getFromLocalStorage(LOCAL_STORAGE.AUTH_ACCESS_TOKEN);
//
//         const queryResult = await client.query({
//             query: gql`
//                 ${query}
//                 `,
//             variables,
//             context: {
//                 headers: {
//                     token
//                 }
//             },
//             fetchPolicy: config.fetchPolicy
//         });
//
//         if (queryResult['data'] &&
//             Object.values(queryResult['data'])[0]?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {
//
//             const tokenResult = await refreshAuthToken();
//
//             if (tokenResult) {
//                 return await getItems(query, variables);
//             } else {
//                 throw new Error(AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID)
//             }
//
//         } else {
//             return queryResult
//         }
//     } catch (e) {
//         throw new Error(e.message)
//     }
//
// };
//
// export const setItems = async (query, variables) => {
//     try {
//         const token = getFromLocalStorage(LOCAL_STORAGE.AUTH_ACCESS_TOKEN);
//
//         const mutationResult = await client.mutate({
//             mutation: gql`
//                ${query}
//              `,
//             variables,
//             context: {
//                 headers: {
//                     token
//                 }
//             },
//             fetchPolicy: config.fetchPolicy
//         });
//
//         if (mutationResult['data'] &&
//             Object.values(mutationResult['data'])[0]?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {
//
//             const tokenResult = await refreshAuthToken();
//
//             if (tokenResult) {
//                 return await setItems(query, variables);
//             } else {
//                 throw new Error(AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID)
//             }
//
//         } else {
//             return mutationResult
//         }
//     } catch (e) {
//         throw new Error(`Помилка: ${config.errorMessages[formError(e)]}`);
//     }
// };
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { getFromLocalStorage } from '../services/local-storage.service.js';
import { config } from '../configs';

const { IntrospectionFragmentMatcher } = require('apollo-cache-inmemory');
const introspectionResult = require('../fragmentTypes.json');

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionResult
});

export const REACT_APP_API_URL =
  window.env && window.env.REACT_APP_API_URL
    ? window.env.REACT_APP_API_URL
    : process.env.REACT_APP_API_URL;

export const client = new ApolloClient({
  link: createUploadLink({ uri: REACT_APP_API_URL }),
  cache: new InMemoryCache({
    addTypename: false,
    fragmentMatcher
  })
});

const formError = (err) => err.message.replace('GraphQL error: ', '');

export const getItems = (query, variables) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  return client
    .query({
      query: gql`
        ${query}
      `,
      variables,
      context: {
        headers: {
          token
        }
      },
      fetchPolicy: 'no-cache'
    })
    .catch((err) => {
      throw new Error(`Помилка: ${config.errorMessages[formError(err)]}`);
    });
};

export const setItems = (query, variables) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  return client
    .mutate({
      mutation: gql`
        ${query}
      `,
      context: {
        headers: {
          token
        }
      },
      variables
    })
    .catch((err) => {
      throw new Error(`Помилка: ${config.errorMessages[formError(err)]}`);
    });
};
