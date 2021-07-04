export const handleImageLoad = (e, callback) => {
  if (e.target.files && e.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (event) => {
      callback(event);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
};

export const backUseEffectHandler = (
  back,
  setBackFn,
  setConstImgFn,
  imagePrefix
) => {
  if (back?.images.thumbnail) {
    setBackFn(`${imagePrefix}${back.images.thumbnail}`);
  }
  // if (back?.constructorImg) {
  //   setConstImgFn(`${imagePrefix}${back.constructorImg}`);
  // }
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

export const useFormikInitialValues = (back) => ({
  backImage: back?.images.thumbnail || '',
  uaName: back?.name[0].value || '',
  enName: back?.name[1].value || '',
  color: back?.features.color._id || '6043a1653e06ad3edcdb7b08',
  optionType: back?.optionType || '"BACK"',
  available: back?.available || false,
  customizable: back?.customizable || false
});
