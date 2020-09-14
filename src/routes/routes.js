import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { useSelector } from 'react-redux';
import UsersPage from '../pages/users/users-page';
import NewsPage from '../pages/news/news-page';
import NewsAdd from '../pages/news/news-add';
import NewsDetails from '../pages/news/news-details';
import NavBar from '../components/nav-bar';
import NavMenu from '../components/nav-menu';
import SnackbarItem from '../components/snackbar';
import DialogWindow from '../components/dialog-window';
import LoginPage from '../pages/login/login-page';
import ErrorPage from '../pages/error-page';
import ProductsPage from '../pages/products/products-page';
import Categories from '../pages/categories/categories-page';
import CategoriesAdd from '../pages/categories/categories-add/categories-add';
import UsersDetails from '../pages/users/users-details';

import { config } from '../configs';
import { history } from '../store/store';

const { routes } = config.app;

const Routes = () => {
  const { isAuth } = useSelector(({ Auth }) => ({
    isAuth: Auth.isAuth
  }));

  //   if (!isAuth) {
  //     return (
  //       <ConnectedRouter history={history}>
  //         <NavBar />
  //         <Switch>
  //           <Route path={routes.pathToLogin} exact component={LoginPage} />
  //           <Route component={ErrorPage} />
  //         </Switch>
  //         <DialogWindow />
  //         <SnackbarItem />
  //       </ConnectedRouter>
  //     );
  //   }

  return (
    <ConnectedRouter history={history}>
      <NavBar />
      <NavMenu />
      <Switch>
        <Route path={routes.pathToUsers} exact component={UsersPage} />
        <Route
          path={routes.pathToUsersDetails}
          exact
          component={UsersDetails}
        />
        <Route path={routes.pathToNews} exact component={NewsPage} />
        <Route path={routes.pathToAddNews} exact component={NewsAdd} />
        <Route path={routes.pathToNewsDetails} exact component={NewsDetails} />
        <Route path={routes.pathToProducts} exact component={ProductsPage} />
        <Route path={routes.pathToCategories} exact component={Categories} />
        <Route
          path={routes.pathToAddCategory}
          exact
          component={CategoriesAdd}
        />
        <Route
          path={routes.pathToEditCategory}
          exact
          render={({ match }) => (
            <CategoriesAdd id={match.params.id} editMode />
          )}
        />
        <Route component={ErrorPage} />
      </Switch>
      <DialogWindow />
      <SnackbarItem />
    </ConnectedRouter>
  );
};

export default Routes;
