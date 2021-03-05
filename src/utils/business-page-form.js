export const setCodeHandler = (condition, businessPage) => {
  if (condition) {
    return businessPage.code;
  }
  return '';
};

export const uaSetTitleHandler = (condition, businessPage) => {
  if (condition) {
    return businessPage.title[0].value;
  }
  return '';
};

export const uaSetTextHandler = (condition, businessPage) => {
  if (condition) {
    return businessPage.text[0].value;
  }
  return '';
};

export const enSetTitleHandler = (condition, businessPage) => {
  if (condition) {
    return businessPage.title[1].value;
  }
  return '';
};

export const enSetTextHandler = (condition, businessPage) => {
  if (condition) {
    return businessPage.text[1].value;
  }
  return '';
};

export const helperTextHandler = (condition, value) => {
  if (condition) {
    return value;
  }
  return '';
};

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
