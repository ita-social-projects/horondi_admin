import React from 'react';

import ConstructorPageContainer from '../../containers/constructor-page-container';
import {
  getAllClosures,
  deleteClosure,
  clearFilters,
  setFilter
} from '../../redux/closures/closures.actions';
import { closuresSelectorWithPagination } from '../../redux/selectors/closures.selectors';
import { config } from '../../configs';

const { constructorItemsKeys } = config;
const itemKey = constructorItemsKeys.closure;
const itemAddPath = config.routes.pathToClosuresAdd;

const ClosuresPage = () => (
  <ConstructorPageContainer
    itemKey={itemKey}
    getItemsAction={getAllClosures}
    deleteItemAction={deleteClosure}
    itemSelectorAction={closuresSelectorWithPagination}
    itemAddPath={itemAddPath}
    setFilterAction={setFilter}
    clearFilterAction={clearFilters}
  />
);

export default ClosuresPage;
