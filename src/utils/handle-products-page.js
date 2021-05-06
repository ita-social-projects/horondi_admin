import React from 'react';

import TableContainerGenerator from '../containers/table-container-generator';

export const handleProductsPage = (
    products,
    itemsCount,
    tableTitles,
    productsItems,
) =>
    (
        <TableContainerGenerator
            pagination
            count={itemsCount}
            tableTitles={tableTitles}
            tableItems={productsItems}
        />
    );
