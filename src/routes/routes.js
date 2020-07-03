import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewsPage from '../pages/news/news-page';
import NewsAddPage from '../pages/news/news-add';
import NavBar from '../components/nav-bar';
import NavMenu from '../components/nav-menu';
import { config } from '../configs';

const { routes } = config.app;

const Routes = () => (
  <Router>
    <NavBar />
    <NavMenu />
    <Switch>
      <Route path={routes.pathToNews} exact component={NewsPage} />
      <Route path={routes.pathToAddNews} exact component={NewsAddPage} />
    </Switch>
  </Router>
);

export default Routes;
