import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewsPage from '../pages/news/news-page/news';
import NavBar from '../components/nav-bar';
import NavMenu from '../components/nav-menu';

const Routes = () => (
  <Router>
    <NavBar />
    <NavMenu />
    <Switch>
      <Route path='/' exact component={NewsPage} />
    </Switch>
  </Router>
);

export default Routes;
