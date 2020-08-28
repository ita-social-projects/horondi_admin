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
import PatternPage from '../pages/pattern/pattern-page';
import PatternAdd from '../pages/pattern/pattern-add';
import PatternDetails from '../pages/pattern/pattern-details';

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
        <Route path={routes.pathToNews} exact component={NewsPage} />
        <Route path={routes.pathToAddNews} exact component={NewsAdd} />
        <Route path={routes.pathToAddPatern} exact component={PatternAdd} />
        <Route path={routes.pathToPatterns} exact component={PatternPage} />
        <Route path={routes.pathToNewsDetails} exact component={NewsDetails} />
        <Route
          path={routes.pathToPatternDetails}
          exact
          component={PatternDetails}
        />
        <Route component={ErrorPage} />
      </Switch>
      <DialogWindow />
      <SnackbarItem />
    </ConnectedRouter>
  );
};

export default Routes;
