import React from 'react';

import ConstructorPageContainer from '../../containers/constructor-page-container';
import {
  getAllPockets,
  deletePocket,
  clearFilters,
  setFilter
} from '../../redux/pockets/pockets.actions';
import { pocketsSelectorWithPagination } from '../../redux/selectors/pockets.selectors';
import { config } from '../../configs';

const { constructorItemsKeys } = config;
const itemKey = constructorItemsKeys.pocket;
const itemAddPath = config.routes.pathToPocketsAdd;

const PocketsPage = () => (
  <ConstructorPageContainer
    itemKey={itemKey}
    getItemsAction={getAllPockets}
    deleteItemAction={deletePocket}
    itemSelectorAction={pocketsSelectorWithPagination}
    itemAddPath={itemAddPath}
    setFilterAction={setFilter}
    clearFilterAction={clearFilters}
  />
);

export default PocketsPage;
