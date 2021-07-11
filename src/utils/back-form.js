export const backUseEffectHandler = (
  back,
  setBackFn,
  setConstImgFn,
  imagePrefix
) => {
  if (back?.images.thumbnail) {
    setBackFn(`${imagePrefix}${back.images.thumbnail}`);
  }
};

export const backFormOnSubmit = (
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

export const setBackColorsHandler = (values, setColor, find, materials) => {
  if (values.material) {
    setColor(
      find(materials.back, (material) => material._id === values.material)
        ?.colors || []
    );
  }
};

export const getBackInitialValues = (isEdit, IMG_URL, back) => ({
  backImage: isEdit ? IMG_URL + back.images.thumbnail : '',
  uaName: back?.name[0].value || '',
  enName: back?.name[1].value || '',
  color: back?.features.color._id || '',
  material: back?.features.material._id || '',
  optionType: back?.optionType || '',
  available: back?.available || false,
  customizable: back?.customizable || false
});
