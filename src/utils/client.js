import ApolloClient, { gql } from 'apollo-boost';

export const REACT_APP_API_URL =
  window.env && window.env.REACT_APP_API_URL
    ? window.env.REACT_APP_API_URL
    : process.env.REACT_APP_API_URL;

const client = new ApolloClient({
  uri: process.env.REACT_APP_BASE_URI
});

const getItems = (query) =>
  client.query({
    query: gql`
      ${query}
    `
  });

const createItems = (mutation, variables) =>
  client.mutate({
    variables: {
      variables
    },
    mutation: gql`
      ${mutation}
    `
  });

export { client, getItems, createItems };
