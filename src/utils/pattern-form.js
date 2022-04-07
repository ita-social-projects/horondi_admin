export const handleImageLoad = (files, callback) => {
  if (files && files[0]) {
    const reader = new FileReader();
    reader.onload = (event) => {
      callback(event);
    };
    reader.readAsDataURL(files[0]);
  }
};

export const patternUseEffectHandler = (
  pattern,
  setPatternFn,
  setConstImgFn,
  imagePrefix
) => {
  if (pattern.images.thumbnail) {
    setPatternFn(`${imagePrefix}${pattern.images.thumbnail}`);
  }
  if (pattern.constructorImg) {
    setConstImgFn(`${imagePrefix}${pattern.constructorImg}`);
  }
};

export const patternFormOnSubmit = (
  condition,
  dispatch,
  updateAction,
  updateActionPayload,
  isEdit,
  secondUpdateActionPayload
) => {
  if (condition) {
    dispatch(updateAction(updateActionPayload));
    return;
  }
  if (isEdit) {
    dispatch(updateAction(secondUpdateActionPayload));
  }
};

export const useFormikInitialValues = (pattern) => ({
  patternConstructorImage: pattern.constructorImg || '',
  patternImage: pattern.images.thumbnail || '',
  uaName: pattern.name[0].value || '',
  enName: pattern.name[1].value || '',
  optionType: pattern.optionType || 'PATTERN',
  uaDescription: pattern.description[0].value || '',
  enDescription: pattern.description[1].value || '',
  material: pattern.features.material._id || '',
  modelId: pattern.model._id || '',
  handmade: pattern.features.handmade || false,
  available: pattern.available || false,
  additionalPrice: pattern.additionalPrice?.value || '',
  additionalPriceType: pattern.additionalPrice?.type || 'ABSOLUTE_INDICATOR'
});
