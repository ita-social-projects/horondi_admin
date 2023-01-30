import React from 'react';
import { Route } from 'react-router';
import { constructorItemEditTest } from '../../../helpers/constructor-item-test/constructor-item-test';
import PositionEdit from '../position-edit/position-edit';
import { config } from '../../../configs';

const { routes } = config;

const itemName = 'Position';
const initialEntries = '/positions/6100724bcbe2440024d73045';

constructorItemEditTest(
  itemName,
  <Route path={routes.pathToPositionEdit} exact component={PositionEdit} />,
  initialEntries
);
