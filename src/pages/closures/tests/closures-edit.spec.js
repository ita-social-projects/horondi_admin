import React from 'react';
import { Route } from 'react-router';
import { constructorItemEditTest } from '../../../helpers/constructor-item-test/constructor-item-test';
import ClosuresEdit from '../closures-edit/closures-edit';
import { config } from '../../../configs';

const { routes } = config;

const itemName = 'Closure';
const initialEntries = '/closures/6043c8acc60c2e4b940189ae';

constructorItemEditTest(
  itemName,
  <Route path={routes.pathToClosuresEdit} exact component={ClosuresEdit} />,
  initialEntries
);
