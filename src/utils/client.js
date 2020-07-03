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

const createItems = (mutation) =>
  client.mutate({
    mutation: gql`
      ${mutation}
    `
  });

// I want to do this service like a:

// const createItems = (mutation, variables) =>
// client.mutate({
//   mutation: gql`
//     ${mutation}
//   `,
//   variables: {
//     variables
//   }
// });

// Problem: I can't add variable (news object as a payload) in news-add-sagas

export { client, getItems, createItems };
