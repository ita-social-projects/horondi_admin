import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectModel } from '../model/model.reducer';

export const modelSelector = createSelector(selectModel, (model) => model);

export const modelSelectorWithPagination = createSelector(
  selectModel,
  selectPagination,
  (model, table) => ({
    ...model,
    ...table
  })
);
