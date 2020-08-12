// import ApolloClient from 'apollo-boost';

import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
// import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';

const introspectionResult = require('../fragmentTypes.json');

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionResult
});
export const REACT_APP_API_URL =
  window.env && window.env.REACT_APP_API_URL
    ? window.env.REACT_APP_API_URL
    : process.env.REACT_APP_API_URL;

// export const client = new ApolloClient({
//   link: ApolloLink.from([
//     new HttpLink({
//       uri: REACT_APP_API_URL,
//     })
//   ]),
//   cache: new InMemoryCache({
//     fragmentMatcher
//   })
// });

export const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: REACT_APP_API_URL,
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});
