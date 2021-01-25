import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectMaterial } from '../material/material.reducer';
import { selectColors } from '../color/color.reducer';

export const materialSelector = createSelector(
  selectMaterial,
  (material) => material
);

export const materialSelectorWithPagination = createSelector(
  selectMaterial,
  selectPagination,
  selectColors,
  (material, table, color) => ({
    ...material,
    ...table,
    ...color
  })
);
