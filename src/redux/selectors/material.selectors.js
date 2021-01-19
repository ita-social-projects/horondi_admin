import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectMaterial } from '../material/material.reducer';

export const materialSelector = createSelector(
  selectMaterial,
  (material) => material
);

export const materialSelectorWithPagination = createSelector(
  selectMaterial,
  selectPagination,
  (material, table) => ({
    ...material,
    ...table
  })
);
