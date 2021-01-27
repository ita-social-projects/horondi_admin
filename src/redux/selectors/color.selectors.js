export const selectColors = ({ Color }) => ({
  colors: Color.list,
  boundMaterials: Color.boundMaterials,
  showBound: Color.showBoundMaterialsWindow,
  showCreateColor: Color.showColorDialogWindow
});

export const selectColorLoading = ({ Color }) => ({
  loading: Color.colorLoading
});
