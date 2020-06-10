import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import {
  StatsPageContainer,
  NewsPageContainer,
  ProductsPageContainer,
  UsersPageContainer,
  UserDetailsPageContainer,
  BrandsPageContainer,
  CategoriesPageContainer,
  CategoryDetailsPageContainer,
  ProductDetailsPage,
  LoginPageContainer
} from '../../container';

import { config } from '../../config';

import ProductAddPage from '../product-add-page';
import CategoryAddPage from '../category-add-page';
import BrandAddPage from '../brand-add-page';
import NewsAddPage from '../news-add-page';
import BrandDetails from '../brand-details';
import NewsDetails from '../news-details';

import OrderDetailPage from '../order-detail-page';

import DialogWindow from '../dialog-window';
import SnackbarItem from '../snackbar-item';

import NavBar from '../nav-bar';
import NavMenu from '../nav-menu';

const { routes } = config.app;

const AppRouter = () => (
  <Router>
    <NavBar />
    <NavMenu />
    <Switch>
      <Route path={routes.pathToOrders} exact component={StatsPageContainer} />
      <Route
        path={routes.pathToProducts}
        exact
        component={ProductsPageContainer}
      />
      <Route path={routes.pathToUsers} exact component={UsersPageContainer} />
      <Route
        path={routes.pathToUserDetails}
        exact
        component={UserDetailsPageContainer}
      />
      <Route
        path={routes.pathToProductDetails}
        exact
        component={ProductDetailsPage}
      />
      <Route path={routes.pathToNews} exact component={NewsPageContainer} />
      <Route path={routes.pathToBrands} exact component={BrandsPageContainer} />
      <Route
        path={routes.pathToCategories}
        exact
        component={CategoriesPageContainer}
      />
      <Route
        path={routes.pathToCategoryDetails}
        exact
        component={CategoryDetailsPageContainer}
      />
      <Route
        path={routes.pathToAddCategory}
        exact
        component={CategoryAddPage}
      />
      <Route path={routes.pathToAddProduct} exact component={ProductAddPage} />
      <Route path={routes.pathToAddBrand} exact component={BrandAddPage} />
      <Route path={routes.pathToAddNews} exact component={NewsAddPage} />
      <Route path={routes.pathToBrandDetails} exact component={BrandDetails} />
      <Route path={routes.pathToNewsDetails} exact component={NewsDetails} />
      <Route path={routes.pathToLogin} exact component={LoginPageContainer} />
      <Route
        path={routes.pathToOrderDetails}
        exact
        component={OrderDetailPage}
      />
      <Redirect to={routes.pathToOrders} />
    </Switch>
    <DialogWindow />
    <SnackbarItem />
  </Router>
);

export default AppRouter;
