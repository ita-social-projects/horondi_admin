import React from 'react';
import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppWrapper from './components/app-wrapper';
import configureStore from './store/store';
import { client } from './utils/client';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

if (window.Cypress) {
  window.store = store;
}
