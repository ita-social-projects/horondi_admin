import React from 'react';

import ConstructorPageContainer from '../../containers/constructor-page-container';
import {
  getAllStraps,
  deleteStrap,
  clearFilters,
  setFilter
} from '../../redux/straps/straps.actions';
import { strapsSelectorWithPagination } from '../../redux/selectors/straps.selectors';
import { config } from '../../configs';

const { constructorItemsKeys } = config;
const itemKey = constructorItemsKeys.strap;
const itemAddPath = config.routes.pathToStrapsAdd;

const StrapsPage = () => (
  <ConstructorPageContainer
    itemKey={itemKey}
    getItemsAction={getAllStraps}
    deleteItemAction={deleteStrap}
    itemSelectorAction={strapsSelectorWithPagination}
    itemAddPath={itemAddPath}
    setFilterAction={setFilter}
    clearFilterAction={clearFilters}
  />
);

export default StrapsPage;
