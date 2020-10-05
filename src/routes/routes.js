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
import Business from '../pages/business-pages';
import BusinessPageForm from '../pages/business-pages/business-page-form';
import ErrorPage from '../pages/error-page';
import ProductsPage from '../pages/products/products-page';
import ProductsAdd from '../pages/products/product-add';
import Categories from '../pages/categories/categories-page';
import CategoriesAdd from '../pages/categories/categories-add/categories-add';
import PatternPage from '../pages/pattern/pattern-page';
import ContactsPage from '../pages/contacts-page';
import ContactsEdit from '../pages/contacts-page/contacts-edit';
import ContactsAdd from '../pages/contacts-page/contacts-add';
import UsersDetails from '../pages/users/users-details';
import CommentsPage from '../pages/comments/comments';
import { config } from '../configs';
import { history } from '../store/store';
import PatternAdd from '../pages/pattern/pattern-add';
import PatternDetails from '../pages/pattern/pattern-details';
import RegisterUser from '../pages/users/register-user';
import ConfirmUser from '../pages/users/confirm-user';

import ProductEdit from '../pages/products/product-edit';

const { routes } = config.app;

const Routes = () => {
  const { isAuth } = useSelector(({ Auth }) => ({
    isAuth: Auth.isAuth
  }));

  if (!isAuth) {
    return (
      <ConnectedRouter history={history}>
        <NavBar />
        <Switch>
          <Route
            path={routes.pathToConfirmAdmin}
            exact
            component={ConfirmUser}
          />
          <Route path={routes.pathToLogin} exact component={LoginPage} />
          <Route component={ErrorPage} />
        </Switch>
        <DialogWindow />
        <SnackbarItem />
      </ConnectedRouter>
    );
  }

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
        <Route path={routes.pathToPatterns} exact component={PatternPage} />
        <Route path={routes.pathToAddNews} exact component={NewsAdd} />
        <Route path={routes.pathToAddPattern} exact component={PatternAdd} />
        <Route path={routes.pathToNewsDetails} exact component={NewsDetails} />
        <Route
          path={routes.pathToPatternDetails}
          exact
          component={PatternDetails}
        />
        <Route path={routes.pathToBusinessPages} exact component={Business} />
        <Route
          path={routes.pathToAddBusinessPage}
          exact
          component={BusinessPageForm}
        />
        <Route
          path={routes.pathToBusinessPageDetails}
          exact
          render={({ match }) => (
            <BusinessPageForm id={match.params.id} editMode />
          )}
        />
        <Route path={routes.pathToContacts} exact component={ContactsPage} />
        <Route
          path={routes.pathToContactsEdit}
          exact
          component={ContactsEdit}
        />
        <Route path={routes.pathToAddContact} exact component={ContactsAdd} />
        <Route path={routes.pathToProducts} exact component={ProductsPage} />
        <Route path={routes.pathToAddProduct} exact component={ProductsAdd} />
        <Route
          path={routes.pathToEditProduct}
          exact
          render={({ match }) => <ProductEdit id={match.params.id} />}
        />
        <Route path={routes.pathToCategories} exact component={Categories} />
        <Route path={routes.pathToComments} exact component={CommentsPage} />
        <Route
          path={routes.pathToRegisterAdmin}
          exact
          component={RegisterUser}
        />
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
