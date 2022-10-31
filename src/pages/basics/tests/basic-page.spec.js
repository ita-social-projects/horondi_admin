import React from 'react';
import BasicPage from '../basics-page';
import { constructorPageTest } from '../../../helpers/constructor-page-test/constructor-page-test';

const itemName = 'Basic';

constructorPageTest(itemName, <BasicPage />);
