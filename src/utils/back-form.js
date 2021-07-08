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

export const getBackInitialValues = (isEdit, IMG_URL, back) => ({
  backImage: isEdit ? IMG_URL + back.images.thumbnail : '',
  uaName: back?.name[0].value || '',
  enName: back?.name[1].value || '',
  color: back?.features.color._id || '6043a1653e06ad3edcdb7b08',
  optionType: back?.optionType || '"BACK"',
  available: back?.available || false,
  customizable: back?.customizable || false
});
