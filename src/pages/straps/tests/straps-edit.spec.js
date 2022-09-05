import React from 'react';
import { Route } from 'react-router';
import { constructorItemEditTest } from '../../../helpers/constructor-item-test/constructor-item-test';
import StrapsEdit from '../straps-edit/straps-edit';
import { config } from '../../../configs';

const { routes } = config;

const itemName = 'Strap';
const initialEntries = '/straps/62a8345a64edab3b28f2d20e';

constructorItemEditTest(
  itemName,
  <Route path={routes.pathToStrapsEdit} exact component={StrapsEdit} />,
  initialEntries
);
