export const getBasicsInitialValues = (edit, IMG_URL, basic) => ({
  basicImage: edit ? IMG_URL + basic.images.thumbnail : '',
  uaName: basic?.name[0].value || '',
  enName: basic?.name[1].value || '',
  color: basic?.features.color._id || '',
  material: basic?.features.material._id || '',
  additionalPrice: edit ? basic?.additionalPrice[1].value / 100 : null,
  available: basic?.available || false
});

export const basicFormOnSubmit = (
  editAndUpload,
  dispatch,
  updateBasic,
  updateActionPayload,
  edit,
  secondUpdateActionPayload
) => {
  if (editAndUpload) {
    dispatch(updateBasic(updateActionPayload));
    return;
  }

  if (edit) {
    dispatch(updateBasic(secondUpdateActionPayload));
  }
};

export const setBasicsColorsHandler = (values, setColor, find, materials) => {
  if (values.material) {
    setColor(
      find(materials.main, (material) => material._id === values.material)
        ?.colors || []
    );
  }
};

export const basicImageHandler = (basic, setBasic, imagePrefix) => {
  if (basic?.images.thumbnail) {
    setBasic(`${imagePrefix}${basic.images.thumbnail}`);
  }
};
