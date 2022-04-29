import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectConstructor } from '../constructor/constructor.reducer';

export const constructorSelector = createSelector(
  selectConstructor,
  (constructor) => constructor
);

export const constructorSelectorWithPagination = createSelector(
  selectConstructor,
  selectPagination,
  (constructor, table) => ({
    ...constructor,
    ...table
  })
);

export const selectConstructorMethodAndMaterials = ({
  Constructor,
  Material,
  Model,
  Pattern
}) => ({
  list: Material.list,
  filters: Material.filters,
  model: Model.model,
  loading: Model.modelLoading,
  patternList: Pattern.list,
  constructorTabs: Constructor.constructorTabs,
  constructorElementMethod: Constructor.constructorElementMethod,
  editableConstructorElement: Constructor.editableConstructorElement
});
