export const backUseEffectHandler = (
  back,
  setBackFn,
  _setConstImgFn,
  imagePrefix
) => {
  if (back?.images.thumbnail) {
    setBackFn(`${imagePrefix}${back.images.thumbnail}`);
  }
};

export const backFormOnSubmit = (
  editAndUpload,
  dispatch,
  updateBack,
  updateActionPayload,
  edit,
  secondUpdateActionPayload
) => {
  if (editAndUpload) {
    dispatch(updateBack(updateActionPayload));
    return;
  }
  if (edit) {
    dispatch(updateBack(secondUpdateActionPayload));
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

export const getBackInitialValues = (edit, IMG_URL, back) => ({
  backImage: edit ? IMG_URL + back.images.thumbnail : '',
  uaName: back?.name[0].value || '',
  enName: back?.name[1].value || '',
  color: back?.features.color._id || '',
  material: back?.features.material._id || '',
  additionalPrice: back?.absolutePrice || '',
  additionalPriceType: 'ABSOLUTE',
  available: back?.available || false,
  customizable: back?.customizable || false
});
