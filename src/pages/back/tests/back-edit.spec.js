import React from 'react';
import { Route } from 'react-router';
import { constructorItemEditTest } from '../../../helpers/constructor-item-test/constructor-item-test';
import BackEdit from '../back-edit/back-edit';
import { config } from '../../../configs';

const { routes } = config;

const itemName = 'Back';
const initialEntries = '/backs/60e71ce82d34d70024decb74';

constructorItemEditTest(
  itemName,
  <Route path={routes.pathToBackDetails} exact component={BackEdit} />,
  initialEntries
);
