import React from 'react';
import PocketsPage from '../pockets-page';
import { constructorPageTest } from '../../../helpers/constructor-page-test/constructor-page-test';

const itemName = 'Bottom';

constructorPageTest(itemName, <PocketsPage />);
