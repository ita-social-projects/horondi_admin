import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import NewsPage from '../pages/news/news-page';
import NewsAddPage from '../pages/news/news-add';
import NavBar from '../components/nav-bar';
import NavMenu from '../components/nav-menu';
import SnackbarItem from '../components/snackbar';

import { config } from '../configs';
import { history } from '../store/store';

const { routes } = config.app;

const Routes = () => (
  <ConnectedRouter history={history}>
    <NavBar />
    <NavMenu />
    <Switch>
      <Route path={routes.pathToNews} exact component={NewsPage} />
      <Route path={routes.pathToAddNews} exact component={NewsAddPage} />
    </Switch>
    <SnackbarItem />
  </ConnectedRouter>
);

export default Routes;
