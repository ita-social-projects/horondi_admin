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
