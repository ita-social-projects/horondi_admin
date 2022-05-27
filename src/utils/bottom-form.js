export const bottomUseEffectHandler = (bottom, setBottomFn, imagePrefix) => {
  if (bottom?.images.thumbnail) {
    setBottomFn(`${imagePrefix}${bottom.images.thumbnail}`);
  }
};

export const bottomFormOnSubmit = (
  editAndUpload,
  dispatch,
  updateBottom,
  updateActionPayload,
  edit,
  secondUpdateActionPayload
) => {
  if (editAndUpload) {
    dispatch(updateBottom(updateActionPayload));
    return;
  }
  if (edit) {
    dispatch(updateBottom(secondUpdateActionPayload));
  }
};

export const setBottomColorsHandler = (values, setColor, find, materials) => {
  if (values.material) {
    setColor(
      find(materials?.bottom, (material) => material._id === values.material)
        ?.colors || []
    );
  }
};

export const getBottomInitialValues = (edit, IMG_URL, bottom) => ({
  bottomImage: edit ? IMG_URL + bottom.images.thumbnail : '',
  uaName: bottom?.name[0].value || '',
  enName: bottom?.name[1].value || '',
  color: bottom?.features.color._id || '',
  material: bottom?.features.material._id || '',
  additionalPrice: bottom?.absolutePrice || '',
  additionalPriceType: 'ABSOLUTE',
  available: bottom?.available || false,
  customizable: bottom?.customizable || false
});
