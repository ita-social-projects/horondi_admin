export const setCodeHandler = (condition, businessPage) =>
  condition ? businessPage.code : '';

export const uaSetTitleHandler = (condition, businessPage) =>
  condition ? businessPage.translations.ua.title : '';

export const uaSetTextHandler = (condition, businessPage) =>
  condition ? businessPage.translations.ua.text : '';

export const enSetTitleHandler = (condition, businessPage) =>
  condition ? businessPage.translations.en.title : '';

export const enSetTextHandler = (condition, businessPage) =>
  condition ? businessPage.translations.en.text : '';

export const businessPageDispatchHandler = (
  mode,
  dispatch,
  update,
  add,
  updatePayload,
  addPayload
) => {
  if (mode) {
    return dispatch(update(updatePayload));
  }
  return dispatch(add(addPayload));
};

export const indexFinder = (i, filesArr, name, size) =>
  i === filesArr.findIndex((obj) => obj.name === name && obj.size === size);
