import React from 'react';

import ConstructorPageContainer from '../../containers/constructor-page-container';
import {
  getAllPositions,
  deletePosition,
  clearFilters,
  setFilter
} from '../../redux/position/position.actions';
import { positionsSelectorWithPagination } from '../../redux/selectors/position.selectors';
import { config } from '../../configs';

const { constructorItemsKeys } = config;
const itemKey = constructorItemsKeys.position;
const itemAddPath = config.routes.pathToPositionAdd;

const PositionPage = () => (
  <ConstructorPageContainer
    itemKey={itemKey}
    getItemsAction={getAllPositions}
    deleteItemAction={deletePosition}
    itemSelectorAction={positionsSelectorWithPagination}
    itemAddPath={itemAddPath}
    setFilterAction={setFilter}
    clearFilterAction={clearFilters}
  />
);

export default PositionPage;
