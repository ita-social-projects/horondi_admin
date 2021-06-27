export const onSubmitPocketsHandler = (
  condition,
  dispatch,
  action,
  payload
) => {
  if (condition) {
    return dispatch(action(payload));
  }
};

export const getPocketsInitialValues = (
  edit,
  IMG_URL,
  pocket,
  additionalPrice,
  restriction
) => ({
  pocketImage: edit ? IMG_URL + pocket.images.thumbnail : '',
  uaName: pocket ? pocket.name[0].value : '',
  enName: pocket ? pocket.name[1].value : '',
  additionalPrice: additionalPrice || null,
  restriction: restriction || false
});
