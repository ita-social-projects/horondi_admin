import React from 'react';
import Typography from '@material-ui/core/Typography';

import TableContainerGenerator from '../containers/table-container-generator';

export const handleProductsPage = (
  products,
  itemsCount,
  tableTitles,
  productsItems,
  style,
  message
) => products.length ? (
  <TableContainerGenerator
    pagination
    count={itemsCount}
    tableTitles={tableTitles}
    tableItems={productsItems}
  />
) : (
  <Typography variant='h1' className={style}>
    {message}
  </Typography>
);
