import React from 'react';

import ConstructorPageContainer from '../../containers/constructor-page-container';
import {
  getAllBasics,
  deleteBasic,
  clearFilters,
  setFilter
} from '../../redux/basics/basics.actions';
import { basicsSelectorWithPagination } from '../../redux/selectors/basics.selectors';
import { config } from '../../configs';

const { constructorItemsKeys } = config;
const itemKey = constructorItemsKeys.basic;
const itemAddPath = config.routes.pathToBasicAdd;

const BasicPage = () => (
  <ConstructorPageContainer
    itemKey={itemKey}
    getItemsAction={getAllBasics}
    deleteItemAction={deleteBasic}
    itemSelectorAction={basicsSelectorWithPagination}
    itemAddPath={itemAddPath}
    setFilterAction={setFilter}
    clearFilterAction={clearFilters}
  />
);

export default BasicPage;
