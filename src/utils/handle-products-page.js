import React from 'react';

import TableContainerGenerator from '../containers/table-container-generator';

export const handleProductsPage = (
  _products,
  itemsCount,
  tableTitles,
  productsItems
) => (
  <TableContainerGenerator
    pagination
    count={itemsCount}
    tableTitles={tableTitles}
    tableItems={productsItems}
  />
);
