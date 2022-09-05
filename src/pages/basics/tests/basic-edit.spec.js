import React from 'react';
import { Route } from 'react-router';
import { constructorItemEditTest } from '../../../helpers/constructor-item-test/constructor-item-test';
import BasicEdit from '../basic-edit/basic-edit';
import { config } from '../../../configs';

const { routes } = config;

const itemName = 'Basic';
const initialEntries = '/basics/619eb96c5bbfb0002540bf84';

constructorItemEditTest(
  itemName,
  <Route path={routes.pathToEditBasic} exact component={BasicEdit} />,
  initialEntries
);
