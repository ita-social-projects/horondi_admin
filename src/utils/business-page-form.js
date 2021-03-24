export const setCodeHandler = (condition, businessPage) =>
  condition ? businessPage.code : '';

export const uaSetTitleHandler = (condition, businessPage) =>
  condition ? businessPage.title[0].value : '';

export const uaSetTextHandler = (condition, businessPage) =>
  condition ? businessPage.text[0].value : '';

export const enSetTitleHandler = (condition, businessPage) =>
  condition ? businessPage.title[1].value : '';

export const enSetTextHandler = (condition, businessPage) =>
  condition ? businessPage.text[1].value : '';

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
