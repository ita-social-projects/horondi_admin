import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { useSelector } from 'react-redux';
import NewsPage from '../pages/news/news-page';
import NewsAdd from '../pages/news/news-add';
import NewsDetails from '../pages/news/news-details';
import NavBar from '../components/nav-bar';
import NavMenu from '../components/nav-menu';
import SnackbarItem from '../components/snackbar';
import DialogWindow from '../components/dialog-window';
import LoginPage from '../pages/login/login-page';
import ErrorPage from '../pages/error-page';

import { config } from '../configs';
import { history } from '../store/store';

const { routes } = config.app;
// null => loading -req on back
//
const Routes = () => {
  const { isAuth } = useSelector(({ Admin }) => ({
    isAuth: Admin.isAuth
  }));
  if (!isAuth) {
    return (
      <ConnectedRouter history={history}>
        <NavBar />
        <NavMenu />
        <Switch>
          <Route path={routes.pathToLogin} exact component={LoginPage} />
          <Route component={ErrorPage} />
        </Switch>
        <DialogWindow />
        <SnackbarItem />
      </ConnectedRouter>
    );
  }

  if (isAuth) {
    return (
      <ConnectedRouter history={history}>
        <NavBar />
        <NavMenu />
        <Switch>
          <Route path={routes.pathToNews} exact component={NewsPage} />
          <Route path={routes.pathToAddNews} exact component={NewsAdd} />
          <Route
            path={routes.pathToNewsDetails}
            exact
            component={NewsDetails}
          />
          <Route component={ErrorPage} />
        </Switch>
        <DialogWindow />
        <SnackbarItem />
      </ConnectedRouter>
    );
  }
};

export default Routes;
