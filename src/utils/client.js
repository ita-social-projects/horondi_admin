import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

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
    addTypename: true,
    fragmentMatcher
  })
});

export const getItems = (query, variables) =>
  client.query({
    query: gql`
      ${query}
    `,
    variables,
    fetchPolicy: 'no-cache'
  });

export const setItems = (query, variables) =>
  client.mutate({
    mutation: gql`
      ${query}
    `,
    variables
  });
