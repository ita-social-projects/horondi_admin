export const selectConstructorMethodAndMaterials = ({
  Constructor,
  Material,
  Model,
  Pattern
}) => ({
  list: Material.list,
  filter: Material.filter,
  model: Model.model,
  loading: Model.modelLoading,
  patternList: Pattern.list,
  constructorTabs: Constructor.constructorTabs,
  constructorElementMethod: Constructor.constructorElementMethod,
  editableConstructorElement: Constructor.editableConstructorElement
});
