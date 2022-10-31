import React from 'react';

import ConstructorPageContainer from '../../containers/constructor-page-container';
import {
  getBacks,
  deleteBack,
  clearFilters,
  setFilter
} from '../../redux/back/back.actions';
import { backSelectorWithPagination } from '../../redux/selectors/back.selectors';
import { config } from '../../configs';

const { constructorItemsKeys } = config;
const itemKey = constructorItemsKeys.back;
const itemAddPath = config.routes.pathToBacksAdd;

const BackPage = () => (
  <ConstructorPageContainer
    itemKey={itemKey}
    getItemsAction={getBacks}
    deleteItemAction={deleteBack}
    itemSelectorAction={backSelectorWithPagination}
    itemAddPath={itemAddPath}
    setFilterAction={setFilter}
    clearFilterAction={clearFilters}
  />
);

export default BackPage;
