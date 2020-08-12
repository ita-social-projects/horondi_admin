import { ApolloClient, InMemoryCache } from '@apollo/client';

export const REACT_APP_API_URL =
  window.env && window.env.REACT_APP_API_URL
    ? window.env.REACT_APP_API_URL
    : process.env.REACT_APP_API_URL;

export const client = new ApolloClient({
  uri: REACT_APP_API_URL,
  cache: new InMemoryCache()
});
