import React from 'react';
// import { useSelector } from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import { NewsPageContainer } from '../../container';

import { config } from '../../config';

import DialogWindow from '../dialog-window';
import SnackbarItem from '../snackbar-item';

import NavBar from '../nav-bar';
import NavMenu from '../nav-menu';

const { routes } = config.app;

const AppRouter = () => (
  // const user = useSelector(admin);
  <Router>
    <NavBar />
    <NavMenu />
    <Switch>
      <Route path={routes.pathToNews} exact component={NewsPageContainer} />
      <Redirect to={routes.pathToNews} />
    </Switch>
    <DialogWindow />
    <SnackbarItem />
  </Router>
);
export default AppRouter;
