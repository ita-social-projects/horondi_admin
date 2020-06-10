import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import 'typeface-roboto';

import App from './components/app';
import {
  productsService,
  productPropetriesService,
  catalogsService,
  brandsService,
  categoriesService,
  usersService,
  colorsService,
  ordersService,
  newsService
} from './services';
import { AdminServiceProvider } from './components/context';

import store from './store';

const adminService = {
  productsService,
  productPropetriesService,
  catalogsService,
  brandsService,
  categoriesService,
  usersService,
  colorsService,
  ordersService,
  newsService
};

ReactDOM.render(
  <Provider store={store}>
    <AdminServiceProvider value={adminService}>
      <App />
    </AdminServiceProvider>
  </Provider>,
  document.getElementById('root')
);

if (window.Cypress) {
  window.store = store;
}
