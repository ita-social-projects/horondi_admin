export const actionDispatchHandler = (
  condition,
  dispatch,
  setFilesAction,
  primaryImage,
  additionalImages
) => {
  if (condition) {
    dispatch(setFilesAction([primaryImage, ...additionalImages]));
  } else if (primaryImage) {
    dispatch(setFilesAction([primaryImage]));
  }
};

export const setModelsHandler = (values, setModelsFn, find, categories) => {
  if (values.category) {
    setModelsFn(
      find(categories, (category) => category._id === values.category)
        ?.models || []
    );
  }
};

export const setSizesHandler = (values, setSizesFn, find, models) => {
  if (values.model) {
    setSizesFn(
      find(models, (model) => model._id === values.model)?.sizes || []
    );
  }
};

export const setInnerColorsHandler = (
  values,
  setInnerColorsFn,
  find,
  materials
) => {
  if (values.innerMaterial) {
    setInnerColorsFn(
      find(materials.inner, (material) => material._id === values.innerMaterial)
        ?.colors || []
    );
  }
};

export const setBottomColorsHandler = (
  values,
  setBottomColorsFn,
  find,
  materials
) => {
  if (values.bottomMaterial) {
    setBottomColorsFn(
      find(
        materials.bottom,
        (material) => material._id === values.bottomMaterial
      )?.colors || []
    );
  }
};

export const setMainColorsHandler = (
  values,
  setMainColorsFn,
  find,
  materials
) => {
  if (values.mainMaterial) {
    setMainColorsFn(
      find(materials.main, (material) => material._id === values.mainMaterial)
        ?.colors || []
    );
  }
};

export const sizeMatchesHandler = (matches) => (matches ? 'small' : 'medium');

export const getFormikMaterialsValues = (product) => ({
  innerMaterial: product?.innerMaterial?.material?._id || '',
  innerColor: product?.innerMaterial?.color?._id || '',
  mainMaterial: product?.mainMaterial?.material?._id || '',
  mainColor: product?.mainMaterial?.color?._id || '',
  bottomMaterial: product?.bottomMaterial?.material?._id || '',
  bottomColor: product?.bottomMaterial?.color?._id || ''
});
