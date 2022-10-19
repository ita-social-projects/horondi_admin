import React from 'react';
import { Route } from 'react-router';
import { constructorItemEditTest } from '../../../helpers/constructor-item-test/constructor-item-test';
import PocketsEdit from '../pockets-edit/pockets-edit';
import { config } from '../../../configs';

const { routes } = config;

const itemName = 'Pocket';
const initialEntries = '/pockets/60e5aa55190df500240e1656';

constructorItemEditTest(
  itemName,
  <Route path={routes.pathToPocketsEdit} exact component={PocketsEdit} />,
  initialEntries
);
