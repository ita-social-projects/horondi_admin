import React from 'react';
import { Route } from 'react-router';
import { constructorItemEditTest } from '../../../helpers/constructor-item-test/constructor-item-test';
import BottomEdit from '../bottom-edit/bottom-edit';
import { config } from '../../../configs';

const { routes } = config;

const itemName = 'Bottom';
const initialEntries = '/bottoms/619e937b5bbfb0002540b7b9';

constructorItemEditTest(
  itemName,
  <Route path={routes.pathToBottomsEdit} exact component={BottomEdit} />,
  initialEntries
);
