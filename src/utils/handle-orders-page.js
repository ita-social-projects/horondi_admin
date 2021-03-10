import React from 'react';
import Typography from '@material-ui/core/Typography';

import TableContainerGenerator from '../containers/table-container-generator';
import { config } from '../configs';

export const handleOrdersPage = (orders, itemsCount, orderItems, style) => orders && orders.length ? (
  <TableContainerGenerator
    pagination
    count={itemsCount}
    tableTitles={config.tableHeadRowTitles.orders}
    tableItems={orderItems}
  />
) : (
  <Typography variant='h1' className={style}>
    {config.titles.orderTitles.ORDER_NOT_FOUND}
  </Typography>
);
