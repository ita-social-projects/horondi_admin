import React from 'react';

import ConstructorPageContainer from '../../containers/constructor-page-container';
import {
  getBottoms,
  deleteBottom,
  clearFilters,
  setFilter
} from '../../redux/bottom/bottom.actions';
import { bottomSelectorWithPagination } from '../../redux/selectors/bottom.selectors';
import { config } from '../../configs';

const { constructorItemsKeys } = config;
const itemKey = constructorItemsKeys.bottom;
const itemAddPath = config.routes.pathToBottomsAdd;

const BottomPage = () => (
  <>
    <ConstructorPageContainer
      itemKey={itemKey}
      getItemsAction={getBottoms}
      deleteItemAction={deleteBottom}
      itemSelectorAction={bottomSelectorWithPagination}
      itemAddPath={itemAddPath}
      setFilterAction={setFilter}
      clearFilterAction={clearFilters}
    />
  </>
);

export default BottomPage;
