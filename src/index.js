import React from 'react';
import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import configureStore from './store/store';
import { client } from './utils/client';
<<<<<<< HEAD
=======

>>>>>>> 0b2dd194 (draft)
import './index.css';

const store = configureStore();

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

if (window.Cypress) {
  window.store = store;
}
